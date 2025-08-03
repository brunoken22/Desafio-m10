"use client";
import SearchBar from "@/components/buscador";
import { FeaturedProducts } from "@/components/destacados";
import { Box, Typography, useTheme } from "@mui/material";

export default function Home() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(6),
        py: theme.spacing(4),
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: theme.spacing(4),
        }}
      >
        <Typography
          variant='h1'
          component='h1'
          sx={{
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: {
              xs: "2.5rem",
              sm: "3.5rem",
              md: "4.5rem",
              lg: "5.5rem",
            },
          }}
        >
          El mejor e-commerce
          <br />
          para tus compras
        </Typography>

        <SearchBar />
      </Box>

      <FeaturedProducts />
    </Box>
  );
}
