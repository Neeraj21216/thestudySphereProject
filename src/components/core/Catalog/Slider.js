import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper/modules"; // ✅ Import modules correctly

import Course_Card from "./Course_card";

const Slider = ({ courses }) => {
 // console.log("course is in slider ",courses);
  return (
    <div>
      {courses?.length ? (
        <Swiper
          modules={[Pagination, Navigation, Autoplay]} 
          spaceBetween={10}
          slidesPerView={3} // ✅ Show one slide at a time for smooth sliding
          loop={true} // ✅ Enable infinite loop
          autoplay={{ delay: 2000, disableOnInteraction: false }} // ✅ Auto-slide every 2 seconds
          pagination={{ clickable: true }} // ✅ Add pagination dots
          navigation={true} // ✅ Enable next/prev buttons
        >
          {courses.map((course, index) => (
            <SwiperSlide key={index}>
              <Course_Card course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>No courses Available</div>
      )}
    </div>
  );
};

export default Slider;
