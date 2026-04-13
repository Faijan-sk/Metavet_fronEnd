import { AlertTriangle, ArrowLeft, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";

//===import useJwt
import useJwt from "../../../enpoints/jwt/useJwt";

function CancelAppointmentModal({
  appointment,
  onClose,
  onConfirmCancel,
  appointmentType,
}) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [apptDate, setApptDate] = useState("");

  useEffect(() => {
    console.log("APAPAPAPAPPA", appointment);
    console.log("PAPAPAPPAPAP", appointmentType);
    if (appointmentType === "BEHAVIOURIST") {
      setSessionId(appointment?.sessionId);
      setApptDate(appointment?.appointmentDate);
    } else if (appointmentType === "WALKER") {
      setSessionId(appointment?.sessionId);
      setApptDate(appointment?.date);
    } else if (appointmentType === "DOCTOR") {
      setSessionId(appointment?._raw?.sessionid);
      setApptDate(appointment?.date);
    } else if (appointmentType === "GROOMER") {
      setSessionId(appointment?.sessionId);
      setApptDate(appointment?.appointmentDate);
    }
  }, [appointment]);

  const handleCancel = async () => {
    if (!reason.trim()) {
      setError("Please provide a reason for cancellation.");
      return;
    }

    try {
      const payload = { reason: reason.trim() };

      const response = await useJwt.refundAppointment(sessionId, payload);

      console.log("API RESPONSE:", response);

      // ❌ Backend error
      if (response?.data?.error) {
        setError(response.data.error); // 👈 SHOW BACKEND ERROR
        return;
      }

      // ✅ Success
      onConfirmCancel(appointment, reason.trim());
      onClose();
    } catch (err) {
      console.error(err);

      // Axios error handling
      const backendError =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Something went wrong";

      setError(backendError); // 👈 SHOW ERROR
    }
  };

  const isCancellationDisabled = () => {
    if (!apptDate) return false;

    const appointmentDate = new Date(apptDate);
    const now = new Date();

    const diffInMs = appointmentDate - now;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    // ❌ Past OR within 24 hrs
    return diffInHours <= 24;
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "480px",
          padding: "0",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            background: "#52B2AD",
            padding: "1.25rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Trash2 size={20} color="white" />
            <span
              style={{ color: "white", fontWeight: "600", fontSize: "16px" }}
            >
              Cancel Appointment
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "1.5rem" }}>
          {/* Appointment Info Summary */}

          {appointmentType == "DOCTOR" && (
            <div
              style={{
                background: "#f0faf9",
                border: "1px solid #b2e0de",
                borderRadius: "10px",
                padding: "1rem",
                marginBottom: "1.25rem",
                fontSize: "14px",
                color: "#2d7a76",
              }}
            >
              <p style={{ margin: "0 0 4px 0", fontWeight: "600" }}>
                Appointment #{appointment.id}
              </p>
              <p style={{ margin: "0 0 2px 0", color: "#555" }}>
                Doctor: {appointment.doctorFirstName}{" "}
                {appointment.doctorLastName}
              </p>
              <p style={{ margin: "0 0 2px 0", color: "#555" }}>
                Pet: {appointment.petName}
              </p>
              <p style={{ margin: "0", color: "#555" }}>
                Date: {appointment.date} &nbsp;|&nbsp; Time: {appointment.time}
              </p>
            </div>
          )}
          {appointmentType == "WALKER" && (
            <div
              style={{
                background: "#f0faf9",
                border: "1px solid #b2e0de",
                borderRadius: "10px",
                padding: "1rem",
                marginBottom: "1.25rem",
                fontSize: "14px",
                color: "#2d7a76",
              }}
            >
              <p style={{ margin: "0 0 4px 0", fontWeight: "600" }}>
                Appointment #{appointment.id}
              </p>
              <p style={{ margin: "0 0 2px 0", color: "#555" }}>
                Walker : {appointment.doctorFirstName}{" "}
                {appointment.doctorLastName}
              </p>
              <p style={{ margin: "0 0 2px 0", color: "#555" }}>
                Pet: {appointment.petName}
              </p>
              <p style={{ margin: "0", color: "#555" }}>
                Date: {appointment.date} &nbsp;|&nbsp; Time: {appointment.time}
              </p>
            </div>
          )}
          {appointmentType == "BEHAVIOURIST" && (
            <div
              style={{
                background: "#f0faf9",
                border: "1px solid #b2e0de",
                borderRadius: "10px",
                padding: "1rem",
                marginBottom: "1.25rem",
                fontSize: "14px",
                color: "#2d7a76",
              }}
            >
              <p style={{ margin: "0 0 4px 0", fontWeight: "600" }}>
                Appointment #{appointment.id}
              </p>
              <p style={{ margin: "0 0 2px 0", color: "#555" }}>
                Bahviourist : {appointment?.serviceProvider?.name}
              </p>
              <p style={{ margin: "0 0 2px 0", color: "#555" }}>
                Pet: {appointment.petName}
              </p>
              <p style={{ margin: "0", color: "#555" }}>
                Date: {appointment.appointmentDate} &nbsp;|&nbsp; Time:{" "}
                {appointment?.slot?.startTime} {"-"}{" "}
                {appointment?.slot?.endTime}
              </p>
            </div>
          )}
          {appointmentType == "GROOMER" && (
            <div
              style={{
                background: "#f0faf9",
                border: "1px solid #b2e0de",
                borderRadius: "10px",
                padding: "1rem",
                marginBottom: "1.25rem",
                fontSize: "14px",
                color: "#2d7a76",
              }}
            >
              <p style={{ margin: "0 0 4px 0", fontWeight: "600" }}>
                Appointment #{appointment.id}
              </p>
              <p style={{ margin: "0 0 2px 0", color: "#555" }}>
                GROOMER : {appointment?.serviceProvider?.name}
              </p>
              <p style={{ margin: "0 0 2px 0", color: "#555" }}>
                Pet: {appointment?.petName}
              </p>
              <p style={{ margin: "0 0 2px 0", color: "#555" }}>
                Service: {appointment?.serviceName}
              </p>
              <p style={{ margin: "0", color: "#555" }}>
                Date: {appointment.appointmentDate} &nbsp;|&nbsp; Time:{" "}
                {appointment?.slot?.startTime}
              </p>
              {/* <p style={{ margin: "0 0 2px 0", color: "#555" }}>
                Fees: ${appointment?.serviceFees}
              </p> */}
            </div>
          )}

          {/* ⚠️ 24hr Refund Warning */}
          <div
            style={{
              background: "#fff8e1",
              border: "1px solid #f9c74f",
              borderRadius: "10px",
              padding: "1rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <AlertTriangle
              size={18}
              color="#e67e00"
              style={{ flexShrink: 0, marginTop: "2px" }}
            />
            <div>
              <p
                style={{
                  margin: "0 0 4px 0",
                  fontWeight: "600",
                  color: "#b45309",
                  fontSize: "13px",
                }}
              >
                Refund Policy — Please Read
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#92400e",
                  lineHeight: "1.5",
                }}
              >
                Appointments scheduled within <strong>24 hours</strong> cannot
                be canceled.
                <strong> No refund will be issued</strong> for such bookings.
                You may cancel and receive a full refund only if done more than
                24 hours in advance.
              </p>
            </div>
          </div>

          {/* Reason Input */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Reason for Cancellation{" "}
              <span style={{ color: "#e53e3e" }}>*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (e.target.value.trim()) setError("");
              }}
              placeholder="Please tell us why you're cancelling this appointment..."
              rows={4}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: error ? "1.5px solid #e53e3e" : "1.5px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "14px",
                color: "#111827",
                resize: "vertical",
                outline: "none",
                fontFamily: "inherit",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = "#52B2AD";
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = "#d1d5db";
              }}
            />
          </div>
          {error && (
            <div
              style={{
                background: "#fee2e2",
                color: "#b91c1c",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            <button
              onClick={onClose}
              style={{
                padding: "10px 20px",
                border: "1.5px solid #d1d5db",
                borderRadius: "8px",
                background: "white",
                color: "#374151",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              <ArrowLeft />
              Back
            </button>
            <button
              onClick={handleCancel}
              disabled={isCancellationDisabled()}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                background: isCancellationDisabled() ? "#9ca3af" : "#e53e3e",
                color: "white",
                fontSize: "14px",
                fontWeight: "600",
                cursor: isCancellationDisabled() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Trash2 size={15} />
              {isCancellationDisabled()
                ? "Cannot Cancel (Within 24 hrs / or past appoinment)"
                : "Yes, Cancel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelAppointmentModal;
