// MedicalHistoryTable.jsx
import React, { useEffect, useState } from "react";
import {
  FileText,
  Calendar,
  ClipboardList,
  Stethoscope,
  Search,
  ChevronDown,
  ChevronUp,
  Eye,
  Loader2,
  AlertCircle,
  Inbox,
} from "lucide-react";
import useJwt from "../../../../enpoints/jwt/useJwt";

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
function truncate(str, n) {
  return str?.length > n ? str.slice(0, n) + "…" : str;
}

// ── Detail Drawer ─────────────────────────────────────────────────────────────
function DetailRow({ record }) {
  return (
    <tr>
      <td colSpan={4} style={{ padding: 0 }}>
        <div
          style={{
            background: "linear-gradient(135deg, #f0fafa 0%, #e8f7f6 100%)",
            borderLeft: "3px solid #52B2AD",
            padding: "20px 28px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#52B2AD",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Client's Note
            </p>
            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.6 }}>
              {record.clientNote || "—"}
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#52B2AD",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Full Prescription
            </p>
            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.6 }}>
              {record.prescriptions || "—"}
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
}

// ── Shared table styles ───────────────────────────────────────────────────────
const thStyle = {
  padding: "12px 16px",
  textAlign: "left",
  fontSize: 12,
  fontWeight: 700,
  color: "#374151",
  letterSpacing: "0.03em",
  whiteSpace: "nowrap",
};
const tdStyle = {
  padding: "13px 16px",
  verticalAlign: "middle",
  fontSize: 13,
  color: "#374151",
};

// ── Main Component ────────────────────────────────────────────────────────────
// appointment se aaye → appointment.fullPet.uid use hoga
// pet se aaye        → pet.uid use hoga
function MedicalHistoryTable({ pet, appointment }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [sortAsc, setSortAsc] = useState(false);

  // ── Resolve petUid from whichever prop is available ──
  const petUid = appointment?.fullPet?.uid ?? pet?.uid ?? null;

  // ── API call ──
  useEffect(() => {
    if (!petUid) {
      setError("Pet information not found.");
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await useJwt.getMedicalHistoryOfPet(petUid);
        const result = response?.data;

        if (result?.success) {
          const records = Array.isArray(result?.data)
            ? result.data
            : result?.data
              ? [result.data]
              : [];
          setData(records);
        } else {
          setError(result?.message || "No medical history found.");
        }
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          "Failed to load medical history. Please try again.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [petUid]); // ✅ petUid direct dependency — re-fetch when it changes

  // ── Filter + sort ──
  const filtered = data
    .filter((r) => {
      const q = search.toLowerCase();
      return (
        r.clientNote?.toLowerCase().includes(q) ||
        r.prescriptions?.toLowerCase().includes(q) ||
        r.appointmentDate?.includes(q)
      );
    })
    .sort((a, b) => {
      const diff = new Date(a.appointmentDate) - new Date(b.appointmentDate);
      return sortAsc ? diff : -diff;
    });

  const toggleExpand = (uid) =>
    setExpandedId((prev) => (prev === uid ? null : uid));

  // ── Loading ──
  if (loading) {
    return (
      <div
        style={{
          fontFamily: "'DM Sans','Segoe UI',sans-serif",
          padding: "32px 24px",
          background: "#f5fafa",
          minHeight: 300,
        }}
      >
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "72px 0",
            gap: 14,
          }}
        >
          <Loader2
            size={34}
            color="#52B2AD"
            style={{ animation: "spin 1s linear infinite" }}
          />
          <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>
            Loading medical history…
          </p>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div
        style={{
          fontFamily: "'DM Sans','Segoe UI',sans-serif",
          padding: "32px 24px",
          background: "#f5fafa",
          minHeight: 300,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "72px 0",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "#fef2f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AlertCircle size={28} color="#ef4444" />
          </div>
          <p
            style={{
              color: "#1f2937",
              fontSize: 15,
              fontWeight: 700,
              margin: 0,
            }}
          >
            Could not load records
          </p>
          <p
            style={{
              color: "#9ca3af",
              fontSize: 13,
              margin: 0,
              textAlign: "center",
              maxWidth: 300,
            }}
          >
            {error}
          </p>
        </div>
      </div>
    );
  }

  // ── Empty ──
  if (data.length === 0) {
    return (
      <div
        style={{
          fontFamily: "'DM Sans','Segoe UI',sans-serif",
          padding: "32px 24px",
          background: "#f5fafa",
          minHeight: 300,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "72px 0",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "#e8f7f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Inbox size={28} color="#52B2AD" />
          </div>
          <p
            style={{
              color: "#1f2937",
              fontSize: 15,
              fontWeight: 700,
              margin: 0,
            }}
          >
            No Medical History
          </p>
          <p style={{ color: "#9ca3af", fontSize: 13, margin: 0 }}>
            No records found for this pet.
          </p>
        </div>
      </div>
    );
  }

  // ── Table ──
  return (
    <div
      style={{
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
        background: "#f5fafa",
        padding: "32px 24px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 4,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "#52B2AD",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stethoscope size={18} color="#fff" />
          </div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#1a2e2d",
              margin: 0,
            }}
          >
            Medical History
          </h1>
        </div>
        <p
          style={{ fontSize: 13, color: "#6b7280", margin: 0, paddingLeft: 46 }}
        >
          {data.length} record{data.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 16px rgba(82,178,173,0.10)",
          overflow: "hidden",
        }}
      >
        {/* Search bar */}
        <div
          style={{ padding: "16px 20px", borderBottom: "1px solid #e8f4f3" }}
        >
          <div style={{ position: "relative" }}>
            <Search
              size={15}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9ca3af",
              }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by note, prescription or date…"
              style={{
                width: "100%",
                paddingLeft: 36,
                paddingRight: 12,
                paddingTop: 9,
                paddingBottom: 9,
                border: "1.5px solid #e5e7eb",
                borderRadius: 10,
                fontSize: 13,
                color: "#374151",
                outline: "none",
                background: "#fafafa",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#52B2AD")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr style={{ background: "#f0fafa" }}>
                <th style={thStyle}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <Calendar size={13} color="#52B2AD" />
                    <button
                      onClick={() => setSortAsc((p) => !p)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#374151",
                        padding: 0,
                      }}
                    >
                      Date
                      {sortAsc ? (
                        <ChevronUp size={13} color="#52B2AD" />
                      ) : (
                        <ChevronDown size={13} color="#52B2AD" />
                      )}
                    </button>
                  </div>
                </th>
                <th style={thStyle}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <ClipboardList size={13} color="#52B2AD" /> Client's Note
                  </div>
                </th>
                <th style={thStyle}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <FileText size={13} color="#52B2AD" /> Prescription
                  </div>
                </th>
                <th style={{ ...thStyle, textAlign: "center" }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      textAlign: "center",
                      padding: "48px 0",
                      color: "#9ca3af",
                      fontSize: 14,
                    }}
                  >
                    No records match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((record, idx) => {
                  const isExpanded = expandedId === record.priscription_uid;
                  const isEven = idx % 2 === 0;
                  return (
                    <React.Fragment key={record.priscription_uid}>
                      <tr
                        style={{
                          background: isExpanded
                            ? "#f0fafa"
                            : isEven
                              ? "#fff"
                              : "#fafefe",
                          borderBottom: "1px solid #f0f4f4",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          if (!isExpanded)
                            e.currentTarget.style.background = "#f5fbfb";
                        }}
                        onMouseLeave={(e) => {
                          if (!isExpanded)
                            e.currentTarget.style.background = isEven
                              ? "#fff"
                              : "#fafefe";
                        }}
                      >
                        <td style={tdStyle}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              background: "#e8f7f6",
                              color: "#2d8f8a",
                              borderRadius: 6,
                              padding: "3px 9px",
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            <Calendar size={11} />
                            {formatDate(record.appointmentDate)}
                          </span>
                        </td>
                        <td style={{ ...tdStyle, maxWidth: 180 }}>
                          <span style={{ color: "#374151" }}>
                            {truncate(record.clientNote, 45)}
                          </span>
                        </td>
                        <td style={{ ...tdStyle, maxWidth: 240 }}>
                          {record.prescriptions ? (
                            <span style={{ color: "#374151" }}>
                              {truncate(record.prescriptions, 60)}
                            </span>
                          ) : (
                            <span
                              style={{
                                color: "#d1d5db",
                                fontStyle: "italic",
                                fontSize: 12,
                              }}
                            >
                              Not added yet
                            </span>
                          )}
                        </td>
                        <td style={{ ...tdStyle, textAlign: "center" }}>
                          <button
                            onClick={() =>
                              toggleExpand(record.priscription_uid)
                            }
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              padding: "5px 12px",
                              borderRadius: 8,
                              border: isExpanded
                                ? "1.5px solid #52B2AD"
                                : "1.5px solid #e5e7eb",
                              background: isExpanded ? "#52B2AD" : "#fff",
                              color: isExpanded ? "#fff" : "#6b7280",
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              if (!isExpanded) {
                                e.currentTarget.style.borderColor = "#52B2AD";
                                e.currentTarget.style.color = "#52B2AD";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isExpanded) {
                                e.currentTarget.style.borderColor = "#e5e7eb";
                                e.currentTarget.style.color = "#6b7280";
                              }
                            }}
                          >
                            <Eye size={13} />
                            {isExpanded ? "Hide" : "View"}
                          </button>
                        </td>
                      </tr>
                      {isExpanded && <DetailRow record={record} />}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid #e8f4f3",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 12, color: "#9ca3af" }}>
            Showing {filtered.length} of {data.length} records
          </span>
          <span style={{ fontSize: 12, color: "#52B2AD", fontWeight: 600 }}>
            Medical History
          </span>
        </div>
      </div>
    </div>
  );
}

export default MedicalHistoryTable;
