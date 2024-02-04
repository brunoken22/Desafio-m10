'use client';
import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation, Pagination, Mousewheel, Keyboard} from 'swiper/modules';

export function CarouselComp(props: any) {
  return (
    <div style={{width: '250px'}}>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className='mySwiper'
        style={{height: '300px', width: '100%'}}>
        {props.img?.map((l: any, p: any) => (
          <SwiperSlide key={p} style={{width: '200px'}}>
            <img src={l.url} alt='a' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
