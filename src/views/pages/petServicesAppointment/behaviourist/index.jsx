import React, { useEffect, useState } from "react";
import useJwt from "../../../../enpoints/jwt/useJwt";
import KycNotFound from "./../KycNotFound";
import KycPending from "./../KycPending";
import { ClipLoader } from "react-spinners";
import BehaviouristDashBoard from "./BehaviouristDashBoard";

function Index() {
  const [loading, setLoading] = useState(true);
  const [kycStatus, setKycStatus] = useState(null); // 👈 IMPORTANT

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await useJwt.getServiceProviderStatus();
        console.log("response =====> ", response.data);

        if (response?.data?.success) {
          setKycStatus(response.data.status);
          // NOT_SUBMITTED | PENDING | APPROVED
        } else {
          setKycStatus("NOT_SUBMITTED");
        }
      } catch (error) {
        console.error("Error fetching KYC status:", error);
        setKycStatus("NOT_SUBMITTED"); // safe fallback
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  // ⏳ Loader
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color="#52B2AD" />
      </div>
    );
  }

  // ❌ KYC not submitted
  if (kycStatus === "NOT_SUBMITTED" || kycStatus === "REJECTED") {
    return <KycNotFound redirectTo="/behaviourist-kyc" />;
  }

  // ⏳ KYC pending
  if (kycStatus === "PENDING") {
    return <KycPending />;
  }

  // ✅ KYC approved → Dashboard
  return <BehaviouristDashBoard />;
}

export default Index;
