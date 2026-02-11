import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  // "pk_live_51R72gCEZRh4nTXfcKlnxd3v5nemLY9oRp91CNcTK8S3fcLQoUb3l8uO1RLiO4SuWjaeOVYXi76YLumQxyV1J5tRN00ckZCQNQY"
  "pk_test_51R72gCEZRh4nTXfcj26Ct5wjLmK1gpZoAHxU1TrR5JXt50ybzY05iRzCx07LQhOjauiwEwjDuLfYQsYC8U9zs4Il00HnOdGrsP"
);
