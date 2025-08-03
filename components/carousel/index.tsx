"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

export function Carousel3D({ images }: { images: Array<{ url: string }> }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 200,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        style={{
          width: "100%",
          height: "100%",
          padding: "40px 0",
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide
            key={index}
            style={{
              backgroundPosition: "center",
              backgroundSize: "cover",
              width: "300px",
              height: "300px",
              borderRadius: "12px",
              overflow: "hidden",
              opacity: index === activeIndex ? 1 : 0.6,
              transition: "opacity 0.3s ease",
            }}
          >
            <Box
              component='img'
              src={img.url}
              alt={`Product view ${index + 1}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                backgroundColor: "background.default",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
