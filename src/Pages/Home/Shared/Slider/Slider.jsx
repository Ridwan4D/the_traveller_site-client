import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import useSlideImage from "../../../../Hooks/useSlideImage";
import useUsers from "../../../../Hooks/useUser";
import SlideModal from "./SlideModal";

const Slider = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { sliderImages } = useSlideImage();
  const { theUser } = useUsers();

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderImages.length > 0 ? (
          sliderImages.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <Link to={"/"} className="relative">
                <img
                  src={slide.url}
                  alt={`slide ${idx + 1}`}
                  className="w-full cursor-pointer h-[25vh] md:max-h-[300px] md:h-auto lg:max-h-[400px] xl:max-h-[500px] 2xl:max-h-[600px] rounded-lg object-contain md:object-cover lg:object-fill md:object-right"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-center md:left-5 lg:left-8 px-1">
                  {slide.title !== "None" && (
                    <h2 className="text-sm md:text-base md:font-medium lg:text-lg lg:font-semibold lg:w-1/2 text-white bg-black/50 p-4 rounded-lg">
                      {slide.title}
                    </h2>
                  )}
                </div>
                {theUser?.role === "admin" && (
                  <span
                    onClick={() =>
                      openModal(`Edit content for slide ${idx + 1}`)
                    }
                    className="absolute top-3 right-3 border-2 p-2 rounded-full bg-white/30 hover:bg-slate-700 hover:text-gray-300 cursor-pointer"
                  >
                    <MdModeEdit className="text-xl" />
                  </span>
                )}
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="relative">
              <img
                src="https://placehold.co/620x400" // Static placeholder image
                alt="default slide"
                className="w-full lg:min-h-[300px] md:max-h-[300px] lg:max-h-[351px] xl:max-h-[500px] h-[50vh] md:h-full rounded-lg object-contain md:object-right lg:object-fill"
              />
              {theUser?.role === "admin" && (
                <span
                  onClick={() => openModal(`Edit content for slide ${1}`)}
                  className="absolute top-3 right-3 border-2 p-2 rounded-full bg-white/30 hover:bg-slate-700 hover:text-gray-300 cursor-pointer"
                >
                  <MdModeEdit className="text-xl" />
                </span>
              )}
            </div>
          </SwiperSlide>
        )}
      </Swiper>
      <SlideModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Slider;
