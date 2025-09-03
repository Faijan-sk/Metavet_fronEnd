import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const DoctorCarousel2 = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      className="w-full"
    >
      {[1, 2, 3, 4, 5, 6].map((doctor) => (
        <SwiperSlide key={doctor} className="mt-10 px-2">
          {" "}
          {/* Added margin on sides */}
          <div className="card shadow-xl w-72 mx-auto">
            {" "}
            {/* Small card size, with center alignment */}
            <figure>
              <img
                src="./src/assets/MetavetImages/dr4.png"
                alt="Doctor"
                className="w-full h-60 object-cover rounded-xl bg-slate-400"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg font-semibold text-gray-800">
                Dr. Diannel Russell
              </h2>
              <p className="text-sm text-gray-600">Neurosurgeon Specialist</p>
              <Link to="/viewprofile2">
                {" "}
                <div className="card-actions justify-end mt-4">
                  <button className="btn bg-primary text-white py-2 px-4 rounded-lg ">
                    View Profile
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DoctorCarousel2;
