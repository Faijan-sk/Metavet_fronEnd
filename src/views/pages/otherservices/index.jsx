import React, { useState } from "react";

const OtherServices = () => {
  // Array of card data with details for each service
  const services = [
    {
      id: 1,
      title: "Examinations & Consultations",
      img: "./src/assets/MetavetImages/treatment-area.d81360469179aca58742.png",
      details:
        "Bringing your pet to   for physical examinations is crucial to their health. We offer thorough physical examinations to detect any potential problems ahead of time. Many pet health problems can be avoided through regular physical exams, so we recommend that your pet have at least two yearly examinations with our staff. While physical exams are critical to animal health, you can do your part by being a vigilant pet owner.",
    },
    {
      id: 2,
      title: "Palliative Care Counselling",
      img: "./src/assets/MetavetImages/veterinarian-black-gloves-with-dog-cat-his-hands.f1aebaa9c3be74e505a1.jpg",
      details:
        " Palliative and end-of-life care help prevent a pet’s suffering by managing pain, meeting nutritional needs, and making sure the pet is comfortable at home. This is particularly beneficial if your pet has been diagnosed with a terminal disease or has a chronic condition that causes pain and discomfort. If your pet has been diagnosed or has any of the following conditions: cognitive dysfunction/dementia, respiratory disease, urinary tract disease, mobility issues, osteoarthritis, cancer, gastrointestinal disease, or intervertebral disc disease, your pet will benefit from a palliative care consult and examination.",
    },
    {
      id: 3,
      title: "Imaging (X-Ray & Ultrasound)",
      img: "./src/assets/MetavetImages/veterinary-teamwork-makes-ultrasound-examination-cat-cat-ultrasound-diagnosis-veterinary-clinic.jpg",
      details:
        "Most people are familiar with the use of radiography and X-rays to diagnose dental and skeletal issues. At we offer both X-ray and ultrasound capabilities as diagnostic tools for your pet.",
    },
    {
      id: 4,
      title: "Vaccination Programs",
      img: "./src/assets/MetavetImages/vaccinations.2bed80d3b7942c944526.webp",
      details:
        "Preventative care is an important aspect of maintaining your pet’s health. Proper vaccination is vital in protecting them against harmful diseases. We believe that preventative care is one of the most important aspects of maintaining your pet’s health. There are a variety of diseases that affect animals, so proper vaccination of your pet is vital in protecting them from the many types of illnesses to which they are susceptible. Starting your pet on the right schedule early is one of the keys to a long and healthy life.",
    },
    {
      id: 5,
      title: "Spays & Neuters",
      img: "./src/assets/MetavetImages/doctor-examining-cat-xray-room.0e8c9e1cfcaf772651b7.jpg",
      details:
        "Spaying or neutering your pet can help them live a longer, healthier life, minimize behavior problems, and help control the population of unwanted dogs and cats. There are many benefits that come with spaying your female companion animal. They include eliminating the sometimes ‘messy’ heat cycles that attract male dogs and preventing diseases in your pet, such as pyometra (infection in the uterus) and mammary cancer. Additionally, research has shown.",
    },
    {
      id: 6,
      title: "Senior Pet Wellness",
      img: "./src/assets/MetavetImages/dog-portrait-green-outdoors.650d15e1fd4e82eea29a.jpg",
      details:
        "We love Senior Pets! Senior pets have special needs and benefit from more regular veterinary visits compared to their younger counterparts. Age-associated conditions include:",
    },
    {
      id: 7,
      title: "Dentistry & Prophylaxis",
      img: "./src/assets/MetavetImages/veterinarian-doctor-inspecting-dog-teeth-vet-clinic.714be52f019b7dfb4724.jpg",
      details:
        "Periodontal disease is the most common dental condition affecting dogs and cats. The problem begins when plaque and calculus are allowed to build up on a pet’s teeth, especially below the gum line. Bad breath, bleeding and inflammation of the gums, receding gums, loosening, and the eventual loss of teeth are the most common signs.",
    },

    {
      id: 8,
      title: "General Surgery",
      img: "./src/assets/MetavetImages/ill-dog-wearing-pet-collar.11c8a03f4e9cbc652cf2.jpg",
      details:
        "Clinic, we can perform almost any surgery your dog or cat might need, or we can direct you to the right expert if you need help. Our knowledgeable veterinarians provide a wide range of surgical services at our clinic, from simple to primary operations. Our veterinarian team goes above and beyond to provide your pet with the best care possible. To keep your pet .",
    },
    {
      id: 9,
      title: "General Anesthesia",
      img: "./src/assets/MetavetImages/close-up-hands-touching-dog.cd8b40d41ec8b8b2d3ff.jpg",
      details:
        "It’s very common to worry about your pet any time he or she has to undergo anesthesia. While there is some degree of risk with any medical procedure, we utilize the safest available medications and require pre-operative blood testing to ensure that your pet is healthy enough for anesthesia. We closely monitor all vitals to make sure your pet is safe and unharmed while he or she is under anesthesia, including heart activity, ECG, blood pressure, oxygen saturation, respiratory system, and temperature.",
    },
    {
      id: 10,
      title: "Pharmacy",
      img: "./src/assets/MetavetImages/pharmacy.2dbb832cb3755fc7d7b6.png",
      details:
        "Veterinary Clinic is always looking to make your experience with us more enjoyable, efficient, and convenient. We offer an on-site pharmacy that can fill your prescriptions while you wait, and you can even send your prescription refill requests to us on this website or via phone. Just log into the pet portal on the front page and follow the instructions.",
    },
    {
      id: 11,
      title: "In House Laboratory/Diagnostic",
      img: "./src/assets/MetavetImages/Pet-In-House-Laboratory-Blood-Urine.1398ade50849e6b824af.webp",
      details:
        "An in-house pet laboratory is specifically designed for the diagnostic testing of animals, typically pets such as cats and dogs. They are equipped with the necessary equipment and staff to perform a wide range of diagnostic testing. It eliminates the need to send samples to an outside laboratory, which can take several days to receive results.",
    },
    {
      id: 12,
      title: "Prescription Diets",
      img: "./src/assets/MetavetImages/chihuahua-is-white-sugar-six-month-old-white-background.92104a86a6aad8d9c995.jpg",
      details:
        "Clinic, we are very excited to offer nutritional advice. Nutrition is so important for pets throughout their lives. As animals age, their nutritional needs change. There are puppy, adult, and senior diets to accommodate pets’ changing needs. Then there are also diets made to help pets with certain diseases and conditions.",
    },
  ];

  // State to track the current page
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  // State to manage the modal visibility and selected service
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Calculate the start and end indices for the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = services.slice(indexOfFirstCard, indexOfLastCard);

  // Pagination handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(services.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Open modal with selected service
  const openModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  return (
    <div className="p-6">
      {/* Veterinary Services Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold mb-4">Veterinary Services</h2>
        <p className="text-lg text-gray-600">
          At Veterinary Clinic, you can trust that your pets are in great hands.
          Our compassionate, skillful veterinary staff are here to help when you
          need us most. We look forward to seeing you soon!
        </p>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-6">
        {currentCards.map((service) => (
          <div key={service.id} className="card bg-base-100 w-72 shadow-2xl">
            <figure className="px-10 pt-10">
              <img
                src={service.img}
                alt={service.title}
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{service.title}</h2>
              <div className="card-actions">
                <button
                  className="btn text-white bg-primary"
                  onClick={() => openModal(service)}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
          className="btn text-white bg-primary mx-2"
        >
          Prev
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`btn mx-2 ${
              currentPage === number ? "bg-primary" : "bg-gray-300"
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage(
              currentPage < pageNumbers.length
                ? currentPage + 1
                : pageNumbers.length
            )
          }
          className="btn text-white bg-primary mx-2"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white w-2/4 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedService?.title}
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {selectedService?.details}
            </p>
            <button className="btn text-white bg-primary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherServices;
