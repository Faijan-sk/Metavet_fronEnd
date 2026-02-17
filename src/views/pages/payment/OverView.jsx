import useJwt from "@src/endpoints/jwt/useJwt";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { CheckCircle, Star } from "react-feather";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Badge, Card, CardBody, CardHeader, CardText, CardTitle, Spinner } from "reactstrap";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const _successUrl = process.env.REACT_APP_STRIPE_SUCCESS_URL_SUBSCRIPTION;
const _failUrl = process.env.REACT_APP_STRIPE_FAIL_URL_SUBSCRIPTION;

export const handleCheckout = async (details, setLoader) => {
  if (setLoader) setLoader(true);

  const stripe = await stripePromise;
  details = {
    ...details,
    success: _successUrl,
    fail: _failUrl,
  };
  try {
    const response = await useJwt.createCheckout(details);
    if (response?.data?.sessionId) {
      localStorage.setItem("payment_details", JSON.stringify({ ...details }));
      const result = await stripe.redirectToCheckout({
        sessionId: response?.data?.sessionId,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } else {
      alert("Failed to initiate checkout.");
    }
  } catch (error) {
    console.error("Checkout error:", error);
  } finally {
    if (setLoader) setLoader(false);
  }
};

/**
 * @module PriceCard
 */

/**
 * PriceCard component displays a pricing plan card with details, features, and a checkout button.
 *
 * @function
 * @param {Object} props - Component props
 * @param {Object} props.planDetails - Details of the pricing plan
 * @param {string} props.planDetails.homeName - Name of the plan for home display
 * @param {string} props.planDetails.loginName - Name of the plan for login display
 * @param {number|string} props.planDetails.price - Price of the plan
 * @param {string} props.planDetails.tagline - Tagline for the plan
 * @param {string[]} props.planDetails.features - List of features included in the plan
 * @param {string} props.planDetails.color - Color used for styling the card/button
 * @param {string} props.planDetails.btnLable - Label for the checkout button
 * @returns {JSX.Element} Rendered PriceCard component
 */
const PriceCard = ({ planDetails, activeSubsciption }) => {
  const { homeName, loginName, price, tagline, features, color, btnLable } = planDetails;
  // ** State
  const [loader, setLoader] = useState(false);

  const handleCheckoutClick = () => {
    // If price is 0, do not proceed with checkout
    if (price == 0) {
      alert("This plan is free. No checkout required.");
      return;
    }
    // Proceed with checkout
    handleCheckout(
      {
        subscription: planDetails.id,
      },
      setLoader,
    );
  };

  const getBtnLabel = () => {
    if (!activeSubsciption) return btnLable;
    const cleaned = loginName.replace(/^\p{Emoji_Presentation}\s*/u, "");
    return cleaned == activeSubsciption ? "Activated Plan" : btnLable;
  };

  return (
    <Card className="price-card-container h-100" style={{ "--btn-color": color }}>
      <CardHeader>
        <div>
          <CardTitle tag={"h4"}>{loginName}</CardTitle>
        </div>
      </CardHeader>
      <CardBody className=" price-top-body">
        <CardText className={"price-text"} tag={"h1"}>
          ${price} <small>/month</small>
        </CardText>
        <div>
          <Badge color="light-secondary">
            <CheckCircle size={12} className="align-middle me-25" />
            <small>{tagline}</small>
          </Badge>
        </div>
        <button
          className={`round mt-2 ${price === 0 ? "disabled" : ""}`}
          block
          style={{ "--btn-color": `${color}`, cursor: price == "0" ? "not-allowed" : "pointer" }}
          onClick={handleCheckoutClick}
          disabled={getBtnLabel() == "Activated Plan"}
        >
          {loader ? (
            <>
              <Spinner size="sm" type="grow" />
              <Spinner size="sm" type="grow" />
              <Spinner size="sm" type="grow" />
            </>
          ) : (
            getBtnLabel()
          )}
        </button>
        <div className="divider">
          <div className="divider-text">
            <Star size={15} />
            <Star size={15} />
            <Star size={15} />
          </div>
        </div>

        <ul>
          {features.map((des) => (
            <li key={des}>{des}</li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export const PriceCardSkeleton = () => {
  return (
    <Card className="price-card-container h-100">
      <CardHeader>
        <div>
          <CardTitle tag="h4">
            <Skeleton width={120} height={20} />
          </CardTitle>
        </div>
      </CardHeader>
      <CardBody className="price-top-body">
        <CardText className="price-text" tag="h1">
          <Skeleton width={80} height={30} />
        </CardText>

        <div>
          <Badge color="light-secondary">
            <CheckCircle size={12} className="align-middle me-25" />
            <small>
              <Skeleton width={100} />
            </small>
          </Badge>
        </div>

        <div className="mt-2">
          <Skeleton height={36} width={"100%"} borderRadius={30} />
        </div>

        <div className="divider mt-3">
          <div className="divider-text">
            <Star size={15} />
            <Star size={15} />
            <Star size={15} />
          </div>
        </div>

        <ul className="mt-1">
          {[...Array(3)].map((_, idx) => (
            <li key={idx}>
              <Skeleton width={`90%`} />
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default PriceCard;