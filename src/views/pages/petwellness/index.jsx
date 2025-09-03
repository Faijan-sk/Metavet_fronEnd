import React from "react";

const PetWellnessProgram = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* Pet Wellness Program Title */}
      <h2 className="text-2xl font-semibold text-center mb-8">
        Pet Wellness Program
      </h2>

      {/* Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg mb-4">
          Clinic offers a progressive new approach to veterinary care. Our
          Wellness Program embraces a focus on preventative medicine based on
          the specific life-stage of your pet. Each patient is assessed
          individually based on factors such as species, breed, age, and
          environmental challenges. Next, we offer recommendations for
          prevention, nutrition, and diagnostic work-ups appropriate for your
          pet.
        </p>
        <p className="text-lg mb-4">
          Our role is to educate you on those procedures and medications
          especially beneficial for your pet. This allows us to be more flexible
          with our recommendations, and gives you more control over your pet’s
          healthcare.
        </p>
        <p className="text-lg mb-4">
          The key to Clinic Wellness Program is an emphasis on the annual health
          examination. Each year, when your pet comes in, he or she will receive
          a comprehensive physical exam and age-appropriate ancillary
          diagnostics (such as blood pressure screening, parasite tests, and
          blood work) to screen for early signs of disease.
        </p>
        <p className="text-lg mb-4">
          For participants in the Clinic Wellness Program, any vaccinations due
          at the time of the annual exam will be given at current participant
          rates. Patients with health-related concerns will be recommended more
          advanced diagnostics when needed. More frequent re-evaluations will
          most-likely become necessary for those pets with ongoing illnesses.
        </p>
        <p className="text-lg mb-4">
          Please contact us for more information or to enroll your pet in the
          Clinic Wellness Program.
        </p>
      </div>
    </div>
  );
};

export default PetWellnessProgram;
