import React, { useEffect, useState } from "react";
import useJwt from "../../../../enpoints/jwt/useJwt";
import KycNotFound from "./../KycNotFound";
import WalkerDashBoard from "./WalkerDashboard"
import { ClipLoader } from "react-spinners";
import KycPending from "./../KycPending"

function Index() {
  const [loading, setLoading] = useState(true);
  const [kycStatus, setKycStatus] = useState(null); // NOT_SUBMITTED | PENDING | APPROVED

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await useJwt.getServiceProviderStatus();
        console.log("response ====> ", response.data);

        if (response.data?.success === false) {
          setKycStatus("NOT_SUBMITTED");
        } else {
          setKycStatus(response.data?.status);
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

  // ❌ Not submitted
  if (kycStatus === "NOT_SUBMITTED" || kycStatus === "REJECTED") {
    return <KycNotFound redirectTo="/walker-kyc" />;
  }

  // ⏳ Pending
  if (kycStatus === "PENDING") {
    return <KycPending />;
  }

  // ✅ Approved
  if (kycStatus === "APPROVED") {
    return <WalkerDashBoard />;
  }

  // 🛑 Fallback (unexpected status)
  return <div>Something went wrong</div>;
}

export default Index;
