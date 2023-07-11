import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

export  function CarouselComp(props:any) {

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
        style={{height:"300px",width:"100%"}}
      >
        {props.img?.map((l:any,p:any)=><SwiperSlide key={p} style={{width:"200px"}}><Image src={l.url} alt="a" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/></SwiperSlide>)}
      </Swiper> 
    </div>
  );
}
