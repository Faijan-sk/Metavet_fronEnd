import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const doctors = [
  {
    id: 1,
    name: "Dr. Jasmine Kimberly",
    specialty: "Cardiologist",
    image: "./src/assets/MetavetImages/dr3.png",
  },
  {
    id: 2,
    name: "Dr. Jasmine Kimberly",
    specialty: "Cardiologist",
    image: "./src/assets/MetavetImages/dr3.png",
  },
  {
    id: 3,
    name: "Dr. Jasmine Kimberly",
    specialty: "Neurologist",
    image: "./src/assets/MetavetImages/dr3.png",
  },
  {
    id: 4,
    name: "Dr. Jasmine Kimberly",
    specialty: "Cardiologist",
    image: "./src/assets/MetavetImages/dr3.png",
  },
  {
    id: 5,
    name: "Dr. Jasmine Kimberly",
    specialty: "Cardiologist",
    image: "./src/assets/MetavetImages/dr3.png",
  },
];

export default function DoctorCarousel() {
  return (
    <div>
      {/* <div>
        Our Veterinarians <p>MEET OUR TOP-RATED VETERINARIANS</p>
        <p>
          "You will be cared for by a team of expert veterinarians with multiple
          years of experience in their
        </p>
        <p>
          fields, ensuring you receive the best possible solution for your pet's
          needs
        </p>
      </div> */}
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div
          className="text-4xl font-bold text-primary"
          style={{ fontFamily: "'Abril Fatface', serif" }}
        >
          Our Veterinarians
        </div>
        <p
          className="text-2xl"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          MEET OUR TOP-RATED VETERINARIANS
        </p>
        <p
          className="text-xl max-w-2xl mx-auto"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          "You will be cared for by a team of expert veterinarians with multiple
          years of experience in their
        </p>
        <p
          className="text-xl max-w-2xl mx-auto"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          fields, ensuring you receive the best possible solution for your pet's
          needs."
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="w-full"
      >
        {doctors.map((doctor) => (
          <SwiperSlide key={doctor.id}>
            <div className="card bg-base-100  shadow-xl m-3">
              <figure className="px-10 pt-10">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="rounded-xl w-32 h-32 bg-slate-200"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{doctor.name}</h2>
                <p>{doctor.specialty}</p>
                <div className="card-actions">
                  <Link to="/viewprofile">
                    {" "}
                    <button className="btn bg-primary text-white">
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
