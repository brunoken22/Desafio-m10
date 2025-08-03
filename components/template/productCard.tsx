"use client";
import { Typography, Card, CardContent, CardMedia, useTheme } from "@mui/material";
import Link from "next/link";

export default function ProductCard({
  id,
  price,
  title,
  image,
}: {
  id: string;
  price: number;
  title: string;
  image: string;
}) {
  const theme = useTheme();

  return (
    <Link href={`/product/${id}`} passHref legacyBehavior>
      <Card
        component='a'
        sx={{
          width: 300,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: theme.shadows[6],
          },
          textDecoration: "none",
        }}
      >
        <CardMedia
          component='img'
          height='220'
          image={image}
          alt={title}
          sx={{
            objectFit: "contain",
            p: 2,
            backgroundColor: theme.palette.background.default,
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant='h6'
            component='div'
            sx={{
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>
          <Typography variant='h5' color='primary' sx={{ fontWeight: 700 }}>
            ${price.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
