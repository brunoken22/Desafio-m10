"use client";
import { Paper, InputBase, IconButton, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface SearchBarProps {
  initialQuery?: string;
  onSearchStart?: (query: string) => void;
  onClearSearch?: () => void; // Nueva prop para manejar limpieza
}

export default function SearchBar({
  initialQuery = "",
  onSearchStart,
  onClearSearch,
}: SearchBarProps) {
  const theme = useTheme();
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [prevQuery, setPrevQuery] = useState(initialQuery);

  // Sincronizar con cambios externos
  useEffect(() => {
    const urlQuery = params.get("q") || "";
    if (urlQuery !== query) {
      setQuery(urlQuery);
      setPrevQuery(urlQuery);
    }
  }, [params]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    // Si el query está vacío, ejecutar búsqueda vacía
    if (trimmedQuery.length === 0) {
      handleClearSearch();
      return;
    }

    // Evitar búsqueda si es muy corto
    if (trimmedQuery.length < 3) {
      return;
    }

    executeSearch(trimmedQuery);
  };

  const executeSearch = (searchTerm: string) => {
    setIsSearching(true);

    if (onSearchStart) {
      onSearchStart(searchTerm);
    }

    router.replace(`/search?q=${encodeURIComponent(searchTerm)}&limit=12&offset=0`, {
      scroll: false,
    });

    setTimeout(() => setIsSearching(false), 300);
  };

  const handleClearSearch = () => {
    if (onClearSearch) {
      onClearSearch();
    }
    router.replace("/search?limit=12&offset=0", { scroll: false });
    setPrevQuery("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);

    // Si el usuario borra completamente el input
    if (newValue.trim().length === 0 && prevQuery.length > 0) {
      handleClearSearch();
    }

    setPrevQuery(newValue);
  };

  return (
    <Paper
      component='form'
      onSubmit={handleSubmit}
      elevation={3}
      sx={{
        p: "4px 8px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 600,
        borderRadius: "50px",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        margin: "0 auto",
      }}
    >
      <InputBase
        name='search'
        sx={{ ml: 2, flex: 1 }}
        placeholder='Buscar productos... (mín. 3 caracteres)'
        value={query}
        onChange={handleChange}
        inputProps={{
          "aria-label": "Buscar productos",
          minLength: 3,
        }}
      />
      <IconButton
        type='submit'
        color='primary'
        disabled={isSearching}
        sx={{
          p: "10px",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
          "&:disabled": {
            opacity: 0.5,
          },
        }}
        aria-label='Buscar'
      >
        <SearchIcon fontSize='medium' />
      </IconButton>
    </Paper>
  );
}
