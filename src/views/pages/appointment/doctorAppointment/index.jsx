import React, { useEffect, useState } from "react";
import WarningPage from "./WarningPage";
import DefaultPage from "./DefaultPage";
import useJwt from "./../../../../enpoints/jwt/useJwt";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DoctorStatusPage() {
  const [profileStatus, setProfileStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorStatus = async () => {
      try {
        const response = await useJwt.getDoctorSatus();
        const status = response?.data?.data?.status;

        setProfileStatus(status);

        // ✅ Redirect only if APPROVED
        if (status === "APPROVED") {
          navigate("/appointment", { replace: true });
        }
      } catch (error) {
        console.error("Failed to fetch doctor status", error);
        setProfileStatus("NOT_FOUND");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorStatus();
  }, [navigate]);

  // ⏳ Loading
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // ❌ Cancelled / Not found / Rejected
  if (
    profileStatus === "CANCELLED" ||
    profileStatus === "NOT_FOUND" ||
    profileStatus === "REJECTED"
  ) {
    return (
      <>
        <WarningPage />
        <DefaultPage />
      </>
    );
  }

  // ⏳ Pending
  if (profileStatus === "PENDING") {
    return <PendingPage />;
  }

  // ✅ Fallback (nothing to render because redirect already happened)
  return null;
}

// ================= Pending Page =================

function PendingPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="w-20 h-20 bg-[#52B2AD]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-[#52B2AD]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Verification in Progress
        </h2>
        <p className="text-gray-600">
          Your account is being verified. Please check back soon!
        </p>
      </div>
    </div>
  );
}

export default DoctorStatusPage;
