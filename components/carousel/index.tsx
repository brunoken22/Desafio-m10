import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
const imagenes=["https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT9XVY-ZTEWGlZQXrOgFAPlY_Mz3YKLXFtcjJ75Ia-ltoNwYj1rx-_FM7ORctbJd2phh5DIIdbs-O__PgPhf1EVQad-9dgX0k6kYQXCXgchemqjK7O5e_RAvQ&usqp=CAc","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT9XVY-ZTEWGlZQXrOgFAPlY_Mz3YKLXFtcjJ75Ia-ltoNwYj1rx-_FM7ORctbJd2phh5DIIdbs-O__PgPhf1EVQad-9dgX0k6kYQXCXgchemqjK7O5e_RAvQ&usqp=CAc","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT9XVY-ZTEWGlZQXrOgFAPlY_Mz3YKLXFtcjJ75Ia-ltoNwYj1rx-_FM7ORctbJd2phh5DIIdbs-O__PgPhf1EVQad-9dgX0k6kYQXCXgchemqjK7O5e_RAvQ&usqp=CAc","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT9XVY-ZTEWGlZQXrOgFAPlY_Mz3YKLXFtcjJ75Ia-ltoNwYj1rx-_FM7ORctbJd2phh5DIIdbs-O__PgPhf1EVQad-9dgX0k6kYQXCXgchemqjK7O5e_RAvQ&usqp=CAc","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT9XVY-ZTEWGlZQXrOgFAPlY_Mz3YKLXFtcjJ75Ia-ltoNwYj1rx-_FM7ORctbJd2phh5DIIdbs-O__PgPhf1EVQad-9dgX0k6kYQXCXgchemqjK7O5e_RAvQ&usqp=CAc"]
export  function CarouselComp() {
  return (
    <div style={{width:"250px"}}>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
        style={{height:"300px"}}
      >
        {imagenes.map((l,p)=><SwiperSlide key={p}><Image src={l} alt="a" fill={true}/></SwiperSlide>)}
      </Swiper>
    </div>
  );
}
