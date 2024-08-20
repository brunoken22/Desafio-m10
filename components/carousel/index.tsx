'use client';
import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation, Pagination, Mousewheel, Keyboard} from 'swiper/modules';

export function CarouselComp(props: any) {
  return (
    <div className='container_swiper'>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className=''>
        {props.img?.map((l: any, p: any) => (
          <SwiperSlide key={p}>
            <img src={l.url} alt='items' className='swiper_image' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
