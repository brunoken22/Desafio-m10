// app/search/page.tsx
"use client";
import { useState, useEffect } from "react";
import { Box, Button, Typography, CircularProgress, useTheme } from "@mui/material";
import { NavigateNext, SentimentDissatisfied } from "@mui/icons-material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearch } from "@/lib/hooks";
import ProductCard from "@/components/template/productCard";
import SearchBar from "@/components/buscador";

export default function SearchPage() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parámetros iniciales
  const initialQuery = searchParams.get("q") || "";
  const initialLimit = parseInt(searchParams.get("limit") || "12");
  const initialOffset = parseInt(searchParams.get("offset") || "0");

  // Estado controlado para la búsqueda
  const [searchState, setSearchState] = useState({
    query: initialQuery,
    limit: initialLimit,
    offset: initialOffset,
    shouldFetch: !!initialQuery,
  });

  // Hook de búsqueda
  const { data, isLoading, error } = useSearch({
    q: searchState.query,
    limit: searchState.limit,
    offset: searchState.offset,
  });

  // Manejar nueva búsqueda
  const handleSearchStart = (query: string) => {
    setSearchState({
      query,
      limit: 12,
      offset: 0,
      shouldFetch: true,
    });
  };

  // Cargar más resultados
  const handleLoadMore = () => {
    const newOffset = searchState.offset + searchState.limit;
    setSearchState((prev) => ({
      ...prev,
      offset: newOffset,
      shouldFetch: true,
    }));
    router.push(
      `/search?q=${encodeURIComponent(searchState.query)}&limit=${
        searchState.limit
      }&offset=${newOffset}`
    );
  };

  // Efecto para sincronizar con parámetros URL
  useEffect(() => {
    const query = searchParams.get("q") || "";
    const limit = parseInt(searchParams.get("limit") || "12");
    const offset = parseInt(searchParams.get("offset") || "0");

    setSearchState((prev) => ({
      query,
      limit,
      offset,
      shouldFetch: query !== prev.query || limit !== prev.limit || offset !== prev.offset,
    }));
  }, [searchParams]);

  const hasMoreResults = data
    ? (data.results?.length || 0) + searchState.offset < (data.pagination?.total || 0)
    : false;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(4),
      }}
    >
      <SearchBar initialQuery={initialQuery} onSearchStart={handleSearchStart} />

      {isLoading && searchState.offset === 0 ? (
        <CircularProgress />
      ) : error ? (
        <Typography color='error'>Error al cargar los resultados</Typography>
      ) : (
        <>
          {/* Resultados encontrados */}
          {data?.pagination?.total ? (
            <Typography variant='body1' color='text.secondary'>
              Mostrando{" "}
              {Math.min((data.results?.length || 0) + searchState.offset, data.pagination.total)} de{" "}
              {data.pagination.total} resultados
            </Typography>
          ) : null}

          {/* Grid de productos */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {data?.results?.length ? (
              data.results.map((product) => (
                <Box
                  sx={{
                    textDecoration: "none",
                    // Asegura que las cards no se compriman demasiado en móviles
                    minWidth: { xs: "140px", sm: "auto" },
                  }}
                >
                  <ProductCard
                    id={product.objectID}
                    price={product["Unit cost"]}
                    title={product.Name}
                    image={product.Images[0].url}
                  />
                </Box>
              ))
            ) : searchState.query && !isLoading ? (
              <Box
                sx={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: theme.spacing(2),
                  p: theme.spacing(4),
                  textAlign: "center",
                }}
              >
                <SentimentDissatisfied
                  sx={{
                    fontSize: "3rem",
                    color: theme.palette.text.disabled,
                  }}
                />
                <Typography variant='h6'>
                  No se encontraron resultados para "{searchState.query}"
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  Intenta con otros términos de búsqueda
                </Typography>
              </Box>
            ) : null}
          </Box>

          {/* Botón para cargar más */}
          {hasMoreResults && (
            <Button
              variant='outlined'
              color='primary'
              onClick={handleLoadMore}
              disabled={isLoading}
              endIcon={isLoading ? <CircularProgress size={20} /> : <NavigateNext />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "50px",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: theme.shadows[2],
                },
                transition: "all 0.3s ease",
              }}
            >
              {isLoading ? "Cargando..." : "Ver más productos"}
            </Button>
          )}
        </>
      )}
    </Box>
  );
}
