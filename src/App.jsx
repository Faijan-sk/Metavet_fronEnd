import { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./@core/layout";
import LoginForm from "./views/pages/forms/login";
import OtpVerification from "./views/pages/forms/otpForm/index";
import SignUp from "./views/pages/forms/registerUser/index";
import DoctorProfileUpdate from "./views/pages/forms/updateForm/index";
import WalkerToClientKyc from "./views/pages/kyc/walker-kyc/WalkerToClientKyc"
import PetRecord from "./views/pages/pets/index";
// ** Pages
const Dashboard = lazy(() => import("./views/pages/dashboard"));
const Appointment = lazy(() => import("./views/pages/appointment"));
const HealthRecord = lazy(() => import("./views/pages/health-record"));
const MyPet = lazy(() => import("./views/pages/mypet"));
const FindDoctor = lazy(() => import("./views/pages/finddoctor"));
const ContactUs = lazy(() => import("./views/pages/contactus"));
// const BookAppointment = lazy(() => import("./views/pages/appointmentform"));
const AddPet = lazy(() => import("./views/pages/addpet"));
const Viewprofile = lazy(() => import("./views/pages/viewprofile"));
const Teleconsultation = lazy(() => import("./views/pages/teleconsultation"));
const TreatmentPlans = lazy(() => import("./views/pages/treatmentplans"));
const Bloodwork = lazy(() => import("./views/pages/bloodwork"));
const Grooming = lazy(() => import("./views/pages/grooming"));
const BehaviouralConcern = lazy(() =>
  import("./views/pages/behaviouralConcern")
);
import WalkerKyc from "./views/pages/kyc/walker-kyc/index"
import Behaviourist  from "./views/pages/kyc/behaviourist-kyc/index"
import BehavioristToClient from "./views/pages/kyc/behaviourist-kyc/behaviouristToClient"
import GroomerToClientKyc from "./views/pages/kyc/groomer-kyc/GroomerToClientKyc"
const GroomerKyc = lazy(() => import("./views/pages/kyc/groomer-kyc/index"));
const KennelsBoarding = lazy(() => import("./views/pages/kennels/boarding"));
const DogTraining = lazy(() => import("./views/pages/dogtraining"));
const Dental = lazy(() => import("./views/pages/dental"));
const Vaccines = lazy(() => import("./views/pages/vaccines"));
const ParasitePrevention = lazy(() =>
  import("./views/pages/parasiteprevention")
);
const SpayingOrNeutering = lazy(() => import("./views/pages/spayingneutering"));
const Nutrition = lazy(() => import("./views/pages/nutrition"));
const Behavior = lazy(() => import("./views/pages/behaviour"));
const OtherServices = lazy(() => import("./views/pages/otherservices"));
const WhatExpect = lazy(() => import("./views/pages/whatexpect"));
const PaymentOptions = lazy(() => import("./views/pages/paymentoption"));
const PetWellnessProgram = lazy(() => import("./views/pages/petwellness"));
const OurTeam = lazy(() => import("./views/pages/ourteam"));
const AboutUs = lazy(() => import("./views/pages/aboutus"));
const MeetTeam = lazy(() => import("./views/pages/meetteam"));
const Blog = lazy(() => import("./views/pages/blogs"));
const PetHealth = lazy(() => import("./views/pages/pethealth"));
const ChoosingPet = lazy(() => import("./views/pages/choosingpet"));
const LivingPet = lazy(() => import("./views/pages/livingpet"));
const VideoNewsroom = lazy(() => import("./views/pages/videonewsroom"));
const TodaysVeterinarian = lazy(() =>
  import("./views/pages/todaysveterinarian")
);
const NewsletterArchive = lazy(() => import("./views/pages/newsletterarchive"));
const HospitalTour = lazy(() => import("./views/pages/hospitaltour"));
const Surgery = lazy(() => import("./views/pages/surgery"));
const Radiology = lazy(() => import("./views/pages/radiology"));
const FAQ = lazy(() => import("./views/pages/faq"));
const OnlineStore = lazy(() => import("./views/pages/onlinestore"));
const SearchProduct = lazy(() => import("./views/pages/searchproduct"));
const MyAccount = lazy(() => import("./views/pages/myaccount"));
const ShoppingBag = lazy(() => import("./views/pages/shoppingbag"));
const Prescription = lazy(() => import("./views/pages/prescriptionrequired"));
const CatProduct = lazy(() => import("./views/pages/catproduct"));
const DogProduct = lazy(() => import("./views/pages/dogproduct"));
const Frontline = lazy(() => import("./views/pages/frontlineplus"));
const Cosequin = lazy(() => import("./views/pages/cosequin"));
const HillScience = lazy(() => import("./views/pages/hillsciencediet"));
const Rimadyl = lazy(() => import("./views/pages/rimadyl"));
const SmallPetGlass = lazy(() => import("./views/pages/smallpetglass"));
const MarketMedley = lazy(() => import("./views/pages/marketmedley"));
const Oxbow = lazy(() => import("./views/pages/oxbow"));
const FeathersTeaser = lazy(() => import("./views/pages/feathersteaser"));
const Kong = lazy(() => import("./views/pages/kong"));
const MilkBone = lazy(() => import("./views/pages/milkbone"));
const HillScienceDog = lazy(() => import("./views/pages/hillsciencedog"));

const ViewProfile4 = lazy(() => import("./views/pages/viewprofile4"));

const App = () => {
  const [themeMode, setThemeMode] = useState("light");
  const queryClient = new QueryClient();

  // ** Light Mode
  const lightTheme = () => {
    setThemeMode("light");
  };
  // ** Dark Mode
  const darkTheme = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {/* Suspense will display a fallback while the lazy components load */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="*" element={<h1>404 page not found</h1>} />
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/healthrecord" element={<HealthRecord />} />
                <Route path="/mypet" element={<MyPet />} />
                <Route path="/finddoctor" element={<FindDoctor />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/addpet" element={<AddPet />} />
                <Route
                  path="/teleconsultation"
                  element={<Teleconsultation />}
                />
                <Route
                  path="/treatment-plans-rx"
                  element={<TreatmentPlans />}
                />
                <Route path="/blood-work" element={<Bloodwork />} />
                <Route path="/grooming" element={<Grooming />} />



                <Route path="/groomer-kyc" element={<GroomerKyc />} />
                <Route path="/walker-kyc" element={<WalkerKyc />} />
                <Route path="/walkerTo-client-Kyc" element={<WalkerToClientKyc />} />
                <Route path="/behaviourist-kyc" element={<Behaviourist/>} />
                <Route path="/behaviouristTo-client-kyc" element={<BehavioristToClient/>} />
                <Route path="/groomerTo-client-kyc" element={<GroomerToClientKyc/>} />




                <Route path="/kennels-boarding" element={<KennelsBoarding />} />
                <Route path="/dog-training" element={<DogTraining />} />
                <Route path="/dental" element={<Dental />} />
                <Route path="/vaccines" element={<Vaccines />} />
                <Route
                  path="/parasite-prevention"
                  element={<ParasitePrevention />}
                />
                <Route path="/about-pet" element={<PetRecord />} />
                <Route
                  path="/spaying-neutering"
                  element={<SpayingOrNeutering />}
                />
                <Route path="/nutrition" element={<Nutrition />} />
                <Route path="/behaviour" element={<Behavior />} />
                <Route path="/other-services" element={<OtherServices />} />
                <Route path="/what-to-expect" element={<WhatExpect />} />
                <Route
                  path="/behavioural-concern"
                  element={<BehaviouralConcern />}
                />
                <Route path="/payment-options" element={<PaymentOptions />} />
                <Route
                  path="/pet-wellness-program"
                  element={<PetWellnessProgram />}
                />
                <Route path="/our-team" element={<OurTeam />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/meet-the-team" element={<MeetTeam />} />
                <Route path="/blogs" element={<Blog />} />
                <Route path="/pet-health" element={<PetHealth />} />
                <Route path="/choosing-pet" element={<ChoosingPet />} />
                <Route path="/livingpet" element={<LivingPet />} />
                <Route path="/videonewsroom" element={<VideoNewsroom />} />
                <Route
                  path="/todayveterinarian"
                  element={<TodaysVeterinarian />}
                />
                <Route path="/newsletter" element={<NewsletterArchive />} />
                <Route path="/surgery" element={<Surgery />} />
                <Route path="/radiology" element={<Radiology />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/viewprofile4" element={<ViewProfile4 />} />
                <Route path="/viewprofile" element={<Viewprofile />} />
                <Route
                  path="/updateProfile/:token"
                  element={<DoctorProfileUpdate />}
                />
                {/* Public Routes */}
                <Route path="/signin" element={<LoginForm />}></Route>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/otp-verification/:token" element={<OtpVerification />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>{" "}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
