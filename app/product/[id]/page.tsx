"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  IconButton,
  useTheme,
} from "@mui/material";
import { CheckCircleOutline, Star, StarBorder, ShoppingCart, Share } from "@mui/icons-material";
import { Carousel3D } from "@/components/carousel";
import { useOrder, useProduct, useFavorite } from "@/lib/hooks";
import { Loader } from "@/ui/loader";
import { favoritos, Favorito, user } from "@/lib/atom";
import { useRecoilValue } from "recoil";

export default function ProductPage({ params }: { params: { id: string } }) {
  const theme = useTheme();
  const router = useRouter();
  const datafavoritos = useRecoilValue(favoritos);
  const { data, isLoading } = useProduct(params.id);
  const [id, setId] = useState("");
  const [favorito, setFavorito] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dataUser = useRecoilValue(user);

  useFavorite(id);

  useEffect(() => {
    if (datafavoritos) {
      const isFavorito = datafavoritos.find((e: Favorito) => e.id === params.id);
      setFavorito(!!isFavorito);
    }
  }, [datafavoritos, params.id]);

  useEffect(() => {
    if (id) {
      setId("");
    }
  }, [id]);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataUser.email) return router.push("/signin");
    const orderResData = await useOrder(params.id, {
      cantidad: quantity <= 0 ? 1 : Number(quantity),
    });
    if (orderResData?.url) {
      router.push(orderResData.url);
    }
  };

  const handleFavorite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataUser.email) return router.push("/signin");

    setFavorito(!favorito);
    setId(params.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data?.Name,
        text: data?.Description,
        url: window.location.href,
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: theme.spacing(4),
        p: theme.spacing(4),
        maxWidth: "1400px",
        margin: "0 auto",
        backgroundColor: theme.palette.background.default,
        borderRadius: "16px",
        boxShadow: theme.shadows[10],
      }}
    >
      {/* Carousel Section */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          minHeight: "400px",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Carousel3D images={data?.Images || []} />

        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            gap: 1,
            zIndex: 2,
          }}
        >
          <IconButton
            onClick={handleFavorite}
            sx={{
              backgroundColor: theme.palette.background.paper,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
            aria-label={favorito ? "Remover de favoritos" : "Agregar a favoritos"}
          >
            {favorito ? (
              <Star sx={{ color: theme.palette.warning.main }} />
            ) : (
              <StarBorder sx={{ color: theme.palette.text.secondary }} />
            )}
          </IconButton>

          <IconButton
            onClick={handleShare}
            sx={{
              backgroundColor: theme.palette.background.paper,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
            aria-label='Compartir producto'
          >
            <Share />
          </IconButton>
        </Box>
      </Box>

      {/* Product Info Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(3),
          p: theme.spacing(3),
          backgroundColor: theme.palette.background.paper,
          borderRadius: "12px",
        }}
      >
        <Typography
          variant='h3'
          component='h1'
          sx={{
            fontWeight: 700,
            fontSize: "2rem",
            color: theme.palette.text.primary,
            lineHeight: 1.2,
          }}
        >
          {data?.Name}
        </Typography>

        <Typography
          variant='h4'
          sx={{
            fontWeight: 600,
            fontSize: "1.8rem",
            color: theme.palette.primary.main,
          }}
        >
          ${data?.["Unit cost"]?.toLocaleString()}
        </Typography>

        {data?.["In stock"] && (
          <Chip
            icon={<CheckCircleOutline />}
            label='Stock disponible'
            color='success'
            sx={{
              alignSelf: "flex-start",
              fontSize: "0.9rem",
              padding: "4px 8px",
            }}
          />
        )}

        <Box component='form' sx={{ mt: 2 }}>
          <InputLabel id='quantity-select-label' sx={{ mb: 1 }}>
            Cantidad
          </InputLabel>
          <Select
            labelId='quantity-select-label'
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            sx={{
              width: "120px",
              "& .MuiSelect-select": {
                padding: "10px 14px",
              },
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Button
          variant='contained'
          onClick={handlePurchase}
          startIcon={<ShoppingCart />}
          sx={{
            py: 1.5,
            mt: 2,
            fontSize: "1rem",
            fontWeight: 600,
            borderRadius: "8px",
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            boxShadow: theme.shadows[4],
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: theme.shadows[6],
            },
            transition: "all 0.3s ease",
          }}
        >
          Comprar ahora
        </Button>

        <Box sx={{ mt: 3 }}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 600,
              mb: 1,
              color: theme.palette.text.primary,
            }}
          >
            Descripción del producto
          </Typography>
          <Typography
            variant='body1'
            sx={{
              lineHeight: 1.6,
              color: theme.palette.text.secondary,
            }}
          >
            {data?.Description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
