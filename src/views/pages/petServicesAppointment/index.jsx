import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const getUserInfo = () => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Error parsing userInfo:", error);
    return null;
  }
};

export default function CompleteYourKYC() {
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  useEffect(() => {
    if (!userInfo || !userInfo.serviceType) {
      navigate("/signin", { replace: true });
      return;
    }

    switch (userInfo.serviceType) {
      case "Pet_Groomer":
        navigate("/pet-groomer", { replace: true });
        break;

      case "Pet_Walker":
        navigate("/pet-walker", { replace: true });
        break;

      case "Pet_Behaviourist":
      case "Pet_Behaviorist": // safe fallback
        navigate("/pet-behaviorist", { replace: true });
        break;

      default:
        navigate("/signin", { replace: true });
    }
  }, [navigate, userInfo]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <ClipLoader color="#52B2AD" />
    </div>
  );
}
