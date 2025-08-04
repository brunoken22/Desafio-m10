"use client";
import { useState, useEffect } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export function Carousel({ images }: { images: Array<{ url: string }> }) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // < 600px
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px - 900px
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg")); // 900px - 1200px
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Configuración responsiva para mostrar una diapositiva completa a la vez
  const getConfig = () => {
    if (isXs) {
      return {
        slidesPerView: 1,
        spaceBetween: 10,
        slide: {
          width: "90%",
          height: "250px",
          borderRadius: "8px",
        },
        padding: "10px 0 40px",
      };
    }
    if (isSm) {
      return {
        slidesPerView: 1,
        spaceBetween: 20,
        slide: {
          width: "80%",
          height: "300px",
          borderRadius: "10px",
        },
        padding: "15px 0 45px",
      };
    }
    if (isMd) {
      return {
        slidesPerView: 1,
        spaceBetween: 30,
        slide: {
          width: "70%",
          height: "350px",
          borderRadius: "12px",
        },
        padding: "20px 0 50px",
      };
    }
    // Desktop (lg+)
    return {
      slidesPerView: 1,
      spaceBetween: 40,
      slide: {
        width: "60%",
        height: "400px",
        borderRadius: "12px",
      },
      padding: "25px 0 55px",
    };
  };

  const { slidesPerView, spaceBetween, slide, padding } = getConfig();

  if (!isMounted) return null;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        maxWidth: "100vw",
        overflow: "hidden",
        ".swiper": {
          width: "100%",
          height: "100%",
          padding: padding,
        },
        ".swiper-wrapper": {
          alignItems: "center",
        },
        ".swiper-slide": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: slide.width,
          height: slide.height,
          borderRadius: slide.borderRadius,
          overflow: "hidden",
          boxShadow: theme.shadows[3],
          backgroundColor: theme.palette.background.paper,
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          },
        },
        // Estilos personalizados para paginación
        ".swiper-pagination": {
          bottom: "10px !important",
          "&-bullet": {
            width: "10px",
            height: "10px",
            margin: "0 5px !important",
            backgroundColor: theme.palette.text.secondary,
            opacity: 0.5,
            transition: "all 0.3s ease",
            "&-active": {
              width: "20px",
              borderRadius: "5px",
              backgroundColor: theme.palette.primary.main,
              opacity: 1,
            },
          },
        },
        // Estilos para navegación
        ".swiper-button-next, .swiper-button-prev": {
          color: theme.palette.primary.main,
          background: theme.palette.background.paper,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          boxShadow: theme.shadows[4],
          "&::after": {
            fontSize: "1.2rem",
          },
          "&:hover": {
            background: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
          },
          // Ocultar navegación en móviles
          display: isXs ? "none" : "flex",
        },
      }}
    >
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: isXs ? 2 : 3,
        }}
        navigation={!isXs}
        modules={[Pagination, Navigation]}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img.url} alt={`Slide ${index + 1}`} loading='lazy' />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
