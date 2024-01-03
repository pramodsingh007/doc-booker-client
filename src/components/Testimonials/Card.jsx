// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';

// import required modules
import { Pagination } from 'swiper/modules';
import TestimonialsCard from './TestimonialsCard';

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
            200: {
                slidesPerView: 1,
                spaceBetween: 20
              },
            420: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              // when window width is >= 480px
              580: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              // when window width is >= 640px
              940: {
                slidesPerView: 3,
                spaceBetween: 40
              }
        }}
      >
        <SwiperSlide className=' overflow-hidden rounded-md '><TestimonialsCard name={'Shourab Mishra'} img={'patient-avatar.png'}/></SwiperSlide>
        <SwiperSlide className=' overflow-hidden rounded-md '><TestimonialsCard name={'Atul Mishra'} img={'patient-avatar2.png'}/></SwiperSlide>
        <SwiperSlide className=' overflow-hidden rounded-md '><TestimonialsCard name={'Abhishek Kumar'} img={'patient-avatar3.png'}/></SwiperSlide>
        
      </Swiper>
    </>
  );
}
