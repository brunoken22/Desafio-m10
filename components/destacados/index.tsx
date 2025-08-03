"use client";
import { Box, Typography, Card, CardContent, CardMedia, useTheme } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import ProductCard from "../template/productCard";
import { useSearch } from "@/lib/hooks";

export function FeaturedProducts() {
  const theme = useTheme();
  const { data, isLoading } = useSearch({ q: "des", limit: 3, offset: 0 });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(4),
      }}
    >
      <Typography
        variant='h2'
        sx={{
          fontWeight: 700,
          textAlign: "center",
          fontSize: {
            xs: "1.5rem",
            sm: "2rem",
            md: "2.5rem",
          },
          color: theme.palette.text.primary,
        }}
      >
        Productos Destacados
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: theme.spacing(4),
          px: theme.spacing(2),
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {isLoading || !data
          ? Array.from({ length: 3 }).map((_, index) => <ProductCardSkeleton key={index} />)
          : data.results?.map((product: any) => (
              <ProductCard
                key={product.objectID}
                id={product.objectID}
                price={product["Unit cost"]}
                title={product.Name}
                image={product.Images[0]?.url}
              />
            ))}
      </Box>
    </Box>
  );
}

function ProductCardSkeleton() {
  return (
    <Card sx={{ width: 300, height: 350 }}>
      <Skeleton variant='rectangular' height={220} />
      <CardContent>
        <Skeleton variant='text' width='80%' height={32} />
        <Skeleton variant='text' width='40%' height={28} />
      </CardContent>
    </Card>
  );
}
