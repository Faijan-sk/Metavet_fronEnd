import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/*
// Lazy load top-level pages (authentication)
const Login = lazy(() => import("./view/pages/authentication/Login"));
const CreateAccount = lazy(() =>
  import("./view/pages/authentication/createAccount")
);
const ForgetPassword = lazy(() =>
  import("./view/pages/authentication/forget.Password")
);
const NewPassword = lazy(() =>
  import("./view/pages/authentication/NewPassword")
);
const SendEmail = lazy(() => import("./view/pages/authentication/sendEmail"));

// Lazy load Layout and its nested pages
const Layout = lazy(() => import("./@core/layout/layout"));
const Home = lazy(() => import("./view/pages/authentication/Home"));
const MyPet = lazy(() => import("./@core/layout/MyPet"));
const PetInfo = lazy(() => import("./@core/layout/petInfo"));

// Lazy load doctor-related pages
const Doctor = lazy(() => import("../src/doctor.Info/doctor"));
const Doctor1 = lazy(() => import("../src/doctor.Info/doctor1"));
const PetAppointments = lazy(() => import("./Pet-Appointment/Appointment"));
const Doctor2 = lazy(() => import("../src/doctor.Info/doctor2"));
const Doctor3 = lazy(() => import("../src/doctor.Info/doctor3"));
const Doctor4 = lazy(() => import("../src/doctor.Info/doctor4"));
const Doctor5 = lazy(() => import("../src/doctor.Info/doctor5"));
const DoctorProfile = lazy(() => import("./doctor.Info/doctorProfile"));
const HealthRecord = lazy(() =>
  import("./view/pages/authentication/HealthRecord")
);
const DoctorContact = lazy(() => import("./doctor.Info/doctorContact"));
const DoctorServices = lazy(() => import("./doctor.Info/doctorServices"));
const DoctorAbout = lazy(() => import("./doctor.Info/doctorAbout"));
const DoctorResources = lazy(() => import("./doctor.Info/doctorResources"));
const DoctorBlog1 = lazy(() => import("./doctor.Info/doctorBlog1"));
const DoctorBlog2 = lazy(() => import("./doctor.Info/doctorBlog2"));
const DoctorBlog3 = lazy(() => import("./doctor.Info/doctorBlog3"));
const DoctorPatientForm = lazy(() => import("./doctor.Info/doctorPatientForm"));
const DoctorPatientFrom1 = lazy(() =>
  import("./doctor.Info/doctorPatientFrom1")
);
const DoctorPatientFrom2 = lazy(() =>
  import("./doctor.Info/doctorPatientFrom2")
);
const DoctorPatientFrom3 = lazy(() =>
  import("./doctor.Info/doctorPatientFrom3")
);
const DoctorOnlineStore = lazy(() => import("./doctor.Info/doctorOnlineStore"));

// Lazy load Online Product pages
const MyAccount = lazy(() => import("./Online.Product/MyAccount"));
const TrackOrder = lazy(() => import("./Online.Product/TrackOrder"));
const ShoppingBag = lazy(() => import("./Online.Product/ShoppingBag"));
const SearchProduct = lazy(() => import("./Online.Product/SearchProduct"));
const CatProduct1 = lazy(() => import("./Online.Product/CatProduct1"));
const CatProduct2 = lazy(() => import("./Online.Product/CatProduct2"));
const CatProduct3 = lazy(() => import("./Online.Product/CatProduct3"));
const PrescriptionFood = lazy(() =>
  import("./Online.Product/PrescriptionFood")
);
const PrescriptionCat = lazy(() => import("./Online.Product/PrescriptionCat"));
const PrescriptionDog = lazy(() => import("./Online.Product/PrescriptionDog"));
const CatProduct4 = lazy(() => import("./Online.Product/CatProduct4"));
const CatProduct5 = lazy(() => import("./Online.Product/CatProduct5"));
const CatProduct6 = lazy(() => import("./Online.Product/CatProduct6"));
const CatProduct7 = lazy(() => import("./Online.Product/CatProduct7"));
const CatProduct8 = lazy(() => import("./Online.Product/CatProduct8"));
const CatProduct9 = lazy(() => import("./Online.Product/CatProduct9"));
const CatProduct10 = lazy(() => import("./Online.Product/CatProduct10"));
const CatProduct11 = lazy(() => import("./Online.Product/CatProduct11"));

// Lazy load Prescription Medicine pages
const DogMedications = lazy(() =>
  import("./Prescription.Medicine/DogMedications")
);
const CatMedications = lazy(() =>
  import("./Prescription.Medicine/CatMedications")
);
const CatPrescription = lazy(() =>
  import("./Prescription.Medicine/CatPrescription")
);
const DogPrescription = lazy(() =>
  import("./Prescription.Medicine/DogPrescription")
);

// Lazy load Pet Services pages
const Dental = lazy(() => import("./Pet-Services/Dental"));
const BloodWork = lazy(() => import("./Pet-Services/BloodWork"));
const DogTraining = lazy(() => import("./Pet-Services/DogTraining"));
const Grooming = lazy(() => import("./Pet-Services/Grooming"));
const Radiology = lazy(() => import("./Pet-Services/Radiology"));
const Vaccines = lazy(() => import("./Pet-Services/Vaccines"));
const Surgery = lazy(() => import("./Pet-Services/Surgery"));
const Microchipping = lazy(() => import("./Pet-Services/Microchipping"));
const WellnessCare = lazy(() => import("./Pet-Services/WellnessCare"));
const Spaying = lazy(() => import("./Pet-Services/Spaying"));
const ParasitePrevention = lazy(() =>
  import("./Pet-Services/ParasitePrevention")
);
const Boarding = lazy(() => import("./Pet-Services/Boarding"));
const Testimonials = lazy(() => import("./Pet-Services/Testimonials"));
const MeetTeam = lazy(() => import("./Pet-Services/MeetTeam"));
const ViewBio = lazy(() => import("./Pet-Services/ViewBio"));

// Lazy load Pet Health Resources pages
const PetHealthTopic = lazy(() =>
  import("./Pet-Health-Resources/PetHealthTopic")
);
const Chronic = lazy(() => import("./Pet-Health-Resources/Chronic"));
const DigestiveHealth = lazy(() =>
  import("./Pet-Health-Resources/DigestiveHealth")
);
const Diseases = lazy(() => import("./Pet-Health-Resources/Diseases"));
const Pests = lazy(() => import("./Pet-Health-Resources/Pests"));
const ChossingPet = lazy(() => import("./Pet-Health-Resources/ChossingPet"));
const FindingPet = lazy(() => import("./Pet-Health-Resources/FindingPet"));
const Cat = lazy(() => import("./Pet-Health-Resources/Cat"));
const Dog = lazy(() => import("./Pet-Health-Resources/Dog"));
const LiveStock = lazy(() => import("./Pet-Health-Resources/LiveStock"));
const LivingPet = lazy(() => import("./Pet-Health-Resources/LivingPet"));
const BringingHome = lazy(() => import("./Pet-Health-Resources/BringingHome"));
const ChildrenPet = lazy(() => import("./Pet-Health-Resources/ChildrenPet"));
const ProvidingCare = lazy(() =>
  import("./Pet-Health-Resources/ProvidingCare")
);
const SayingGoodBye = lazy(() =>
  import("./Pet-Health-Resources/SayingGoodBye")
);
const NewsLetter = lazy(() => import("./Pet-Health-Resources/NewsLetter"));
const TipPetOwner = lazy(() => import("./Pet-Health-Resources/TipPetOwner"));
const Behavior = lazy(() => import("./Pet-Health-Resources/Behavior"));
const FleasParasites = lazy(() =>
  import("./Pet-Health-Resources/FleasParasites")
);
const KeepingHealthy = lazy(() =>
  import("./Pet-Health-Resources/KeepingHealthy")
);
const RecognizingIllness = lazy(() =>
  import("./Pet-Health-Resources/RecognizingIllness")
);
const NutritionFood = lazy(() =>
  import("./Pet-Health-Resources/NutritionFood")
);

// Lazy load Topic Read More pages (example)
const BookAppointment = lazy(() => import("./doctor.Info/BookAppointment"));
const Arthritis = lazy(() => import("./Topic-Read-More/Arthritis"));
const Leptospirosis = lazy(() => import("./Topic-Read-More/Leptospirosis"));
const Dentistry = lazy(() => import("./Topic-Read-More/Dentistry"));
const Fleas = lazy(() => import("./Topic-Read-More/Fleas"));
const Epilepsy = lazy(() => import("./Topic-Read-More/Epilepsy"));
const Seizures = lazy(() => import("./Topic-Read-More/Seizures"));
const Vertigo = lazy(() => import("./Topic-Read-More/Vertigo"));
const Obesity = lazy(() => import("./Topic-Read-More/Obesity"));
const Cancer = lazy(() => import("./Topic-Read-More/Cancer"));
const Feline = lazy(() => import("./Topic-Read-More/Feline"));
const Bloat = lazy(() => import("./Topic-Read-More/Bloat"));
const Gastric = lazy(() => import("./Topic-Read-More/Gastric"));
const FelineLeukemia = lazy(() => import("./Topic-Read-More/FelineLeukemia"));
const Zoonosis = lazy(() => import("./Topic-Read-More/Zoonosis"));
const FelineDistemper = lazy(() => import("./Topic-Read-More/FelineDistemper"));
const CanineDistemper = lazy(() => import("./Topic-Read-More/CanineDistemper"));
const Salmonella = lazy(() => import("./Topic-Read-More/Salmonella"));
const Roundworms = lazy(() => import("./Topic-Read-More/Roundworms"));
const Parasites = lazy(() => import("./Topic-Read-More/Parasites"));
const Hookworm = lazy(() => import("./Topic-Read-More/Hookworm"));
const Mites = lazy(() => import("./Topic-Read-More/Mites"));
const Heartworm = lazy(() => import("./Topic-Read-More/Heartworm"));
const PetShop = lazy(() => import("./Topic-Read-More/PetShop"));
const RescueAgency = lazy(() => import("./Topic-Read-More/RescueAgency"));
const AnimalShelter = lazy(() => import("./Topic-Read-More/AnimalShelter"));
const Breeder = lazy(() => import("./Topic-Read-More/Breeder"));
const Breed = lazy(() => import("./Topic-Read-More/Breed"));
const Selecting = lazy(() => import("./Topic-Read-More/Selecting"));
const Goats = lazy(() => import("./Topic-Read-More/Goats"));
const Donkeys = lazy(() => import("./Topic-Read-More/Donkeys"));
const Cows = lazy(() => import("./Topic-Read-More/Cows"));
const Sheep = lazy(() => import("./Topic-Read-More/Sheep"));
const MicrochipYourCat = lazy(() =>
  import("./Topic-Read-More/MicrochipYourCat")
);
const MicrochipYourDog = lazy(() =>
  import("./Topic-Read-More/MicrochipYourDog")
);
const MicrochipDog1 = lazy(() => import("./Topic-Read-More/MicrochipDog1"));
const MicrochipCat1 = lazy(() => import("./Topic-Read-More/MicrochipCat1"));
const MicrochipCat2 = lazy(() => import("./Topic-Read-More/MicrochipCat2"));
const MicrochipDog2 = lazy(() => import("./Topic-Read-More/MicrochipDog2"));
const ManagingPet = lazy(() => import("./Topic-Read-More/ManagingPet"));
const TellPets = lazy(() => import("./Topic-Read-More/TellPets"));
const TreatCommon = lazy(() => import("./Topic-Read-More/TreatCommon"));
const TeachingChild = lazy(() => import("./Topic-Read-More/TeachingChild"));
const PetSkin = lazy(() => import("./Topic-Read-More/PetSkin"));
const ServiceDog = lazy(() => import("./Topic-Read-More/ServiceDog"));
const VetVisits = lazy(() => import("./Topic-Read-More/VetVisits"));
const YourDog = lazy(() => import("./Topic-Read-More/YourDog"));
const PetAnxiety = lazy(() => import("./Topic-Read-More/PetAnxiety"));
const CatPersonality = lazy(() => import("./Topic-Read-More/CatPersonality"));
const PetSafe = lazy(() => import("./Topic-Read-More/PetSafe"));
const Ehrlichiosis = lazy(() => import("./Topic-Read-More/Ehrlichiosis"));
const Creepy = lazy(() => import("./Topic-Read-More/Creepy"));
const FleaPreventative = lazy(() =>
  import("./Topic-Read-More/FleaPreventative")
);
const Frustrating = lazy(() => import("./Topic-Read-More/Frustrating"));
const Giardia = lazy(() => import("./Topic-Read-More/Giardia"));
const CaringOlderPet = lazy(() => import("./Topic-Read-More/CaringOlderPet"));
const Antibiotics = lazy(() => import("./Topic-Read-More/Antibiotics"));
const Dementia = lazy(() => import("./Topic-Read-More/Dementia"));
const PetDentalCare = lazy(() => import("./Topic-Read-More/PetDentalCare"));
const Symptoms = lazy(() => import("./Topic-Read-More/Symptoms"));
const Gastroenteritis = lazy(() => import("./Topic-Read-More/Gastroenteritis"));
const EatGrass = lazy(() => import("./Topic-Read-More/EatGrass"));
const Euthanasia = lazy(() => import("./Topic-Read-More/Euthanasia"));
const PetHide = lazy(() => import("./Topic-Read-More/PetHide"));
const WetNose = lazy(() => import("./Topic-Read-More/WetNose"));
const CommonDigestive = lazy(() => import("./Topic-Read-More/CommonDigestive"));
const HomeMade = lazy(() => import("./Topic-Read-More/HomeMade"));
const Taurine = lazy(() => import("./Topic-Read-More/Taurine"));
const SafeFood = lazy(() => import("./Topic-Read-More/SafeFood"));
const GuidePet = lazy(() => import("./Topic-Read-More/GuidePet"));
const PetFoodSafety = lazy(() => import("./Topic-Read-More/PetFoodSafety"));
const PetWeight = lazy(() => import("./Topic-Read-More/PetWeight"));
const Environment = lazy(() => import("./Topic-Read-More/Environment"));
const Exams = lazy(() => import("./Topic-Read-More/Exams"));
const Obedience = lazy(() => import("./Topic-Read-More/Obedience"));
const PetTherapy = lazy(() => import("./Topic-Read-More/PetTherapy"));
const Advantages = lazy(() => import("./Topic-Read-More/Advantages"));
const Introductions = lazy(() => import("./Topic-Read-More/Introductions"));
const Mealtime = lazy(() => import("./Topic-Read-More/Mealtime"));
const SeniorCat = lazy(() => import("./Topic-Read-More/SeniorCat"));
const Catnip = lazy(() => import("./Topic-Read-More/Catnip"));
const Seasonal = lazy(() => import("./Topic-Read-More/Seasonal"));
const Recognizing = lazy(() => import("./Topic-Read-More/Recognizing"));
const NextStep = lazy(() => import("./Topic-Read-More/NextStep"));
const Decision = lazy(() => import("./Topic-Read-More/Decision"));
const Euthanasia1 = lazy(() => import("./Topic-Read-More/Euthanasia1"));
const Rainbow = lazy(() => import("./Topic-Read-More/Rainbow"));

// Lazy load additional Pet Health Resources and Topic pages
const VideoNewsroom = lazy(() =>
  import("./Pet-Health-Resources/VideoNewsroom")
);
const HealthTopics = lazy(() => import("./Pet-Health-Resources/HealthTopics"));
const Technology = lazy(() => import("./Pet-Health-Resources/Technology"));
const OtherInterest = lazy(() =>
  import("./Pet-Health-Resources/OtherInterest")
);
const Battling = lazy(() => import("./Topic-Read-More/Battling"));
const Overweight = lazy(() => import("./Topic-Read-More/Overweight"));
const Pain = lazy(() => import("./Topic-Read-More/Pain"));
const Ophthalmology = lazy(() => import("./Topic-Read-More/Ophthalmology"));
const Senior1 = lazy(() => import("./Topic-Read-More/Senior1"));
const StemCell = lazy(() => import("./Topic-Read-More/StemCell"));
const Acupuncture = lazy(() => import("./Topic-Read-More/Acupuncture"));
const Cutting = lazy(() => import("./Topic-Read-More/Cutting"));
const Hitech = lazy(() => import("./Topic-Read-More/Hitech"));
const Groups = lazy(() => import("./Topic-Read-More/Groups"));
const Winter = lazy(() => import("./Topic-Read-More/Winter"));
const Traveling = lazy(() => import("./Topic-Read-More/Traveling"));
const Strange = lazy(() => import("./Topic-Read-More/Strange"));
const Puppies = lazy(() => import("./Topic-Read-More/Puppies"));
const Proofing = lazy(() => import("./Topic-Read-More/Proofing"));
const Itching = lazy(() => import("./Topic-Read-More/Itching"));
const Laparoscopic = lazy(() => import("./Topic-Read-More/Laparoscopic"));
const Internet = lazy(() => import("./Topic-Read-More/Internet"));
const Microchips = lazy(() => import("./Topic-Read-More/Microchips"));
const Todays = lazy(() => import("./Pet-Health-Resources/Todays"));
const ClientSurvey = lazy(() => import("./Pet-Health-Resources/ClientSurvey"));
const PetKids = lazy(() => import("./Pet-Health-Resources/PetKids"));
const YourVet = lazy(() => import("./Topic-Read-More/YourVet"));
const WhatWeDo = lazy(() => import("./Topic-Read-More/WhatWeDo"));
const Approach = lazy(() => import("./Topic-Read-More/Approach"));
const Learn = lazy(() => import("./Topic-Read-More/Learn"));
const Vetopedia = lazy(() => import("./Topic-Read-More/Vetopedia"));
const NewsletterArchive = lazy(() =>
  import("./Pet-Health-Resources/NewsletterArchive")
);
const FunPets = lazy(() => import("./Pet-Health-Resources/FunPets"));
const UnbelievablePets = lazy(() =>
  import("./Pet-Health-Resources/UnbelievablePets")
);
const PetDream = lazy(() => import("./Topic-Read-More/PetDream"));
const Enrichment = lazy(() => import("./Topic-Read-More/Enrichment"));
const TiredDog = lazy(() => import("./Topic-Read-More/TiredDog"));
const Camping = lazy(() => import("./Topic-Read-More/Camping"));
const ProtectPets = lazy(() => import("./Topic-Read-More/ProtectPets"));
const GetDown = lazy(() => import("./Topic-Read-More/GetDown"));
const DogPark = lazy(() => import("./Topic-Read-More/DogPark"));
const AssistanceDogs = lazy(() => import("./Topic-Read-More/AssistanceDogs"));
const UsesAnimal = lazy(() => import("./Topic-Read-More/UsesAnimal"));
const WhiteHouse = lazy(() => import("./Topic-Read-More/WhiteHouse"));
const Incredible = lazy(() => import("./Topic-Read-More/Incredible"));
const RescueDogs = lazy(() => import("./Topic-Read-More/RescueDogs"));
const ClientSurvey1 = lazy(() => import("./Topic-Read-More/ClientSurvey1"));
const WellnessColoring = lazy(() =>
  import("./Topic-Read-More/WellnessColoring")
);
const Puzzles = lazy(() => import("./Topic-Read-More/Puzzles"));
const SmallMammals = lazy(() => import("./Pet-Health-Resources/SmallMammals"));
const Ferrets = lazy(() => import("./Pet-Health-Resources/Ferrets"));
const Rabbits = lazy(() => import("./Pet-Health-Resources/Rabbits"));
const Restraint = lazy(() => import("./Topic-Read-More/Restraint"));
const FerretHealth1 = lazy(() => import("./Topic-Read-More/FerretHealth1"));
const Gerbils = lazy(() => import("./Topic-Read-More/Gerbils"));
const BehaviorTraining = lazy(() =>
  import("./Topic-Read-More/BehaviorTraining")
);
const FoodHousing = lazy(() => import("./Topic-Read-More/FoodHousing"));
const FoodHousing1 = lazy(() => import("./Topic-Read-More/FoodHousing1"));
const Services1 = lazy(() => import("./Pet-Services/Services1"));
const Birds = lazy(() => import("./Pet-Health-Resources/Birds"));
const Cockatiels = lazy(() => import("./Topic-Read-More/Cockatiels"));
const Zebra = lazy(() => import("./Topic-Read-More/Zebra"));
const Macaws = lazy(() => import("./Topic-Read-More/Macaws"));
const OurTeam = lazy(() => import("./Pet-Services/OurTeam"));
const HospitalTour = lazy(() => import("./Pet-Health-Resources/HospitalTour"));
const Nutrition = lazy(() => import("./Pet-Services/Nutrition"));
const FAQ = lazy(() => import("./Pet-Services/FAQ"));
const Behaviour11 = lazy(() => import("./Pet-Services/Behaviour11"));
const Teleconsultation = lazy(() => import("./Pet-Services/Teleconsultation"));
const TreatmentPlans = lazy(() => import("./Pet-Services/TreatmentPlans"));
*/

function App() {
  return (
    <BrowserRouter>
      {/* Suspense will display a fallback while the lazy components load */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Authentication Routes */}
          {/* <Route path="/" element={<Login />} />
          <Route path="/singup" element={<CreateAccount />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/newpassword" element={<NewPassword />} />
          <Route path="/email" element={<SendEmail />} /> */}

          {/* 404 fallback */}
          <Route path="*" element={<h1>404 page not found</h1>} />

          {/* Protected / Nested Layout Routes */}
          <Route path="/" element={<Layout />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
