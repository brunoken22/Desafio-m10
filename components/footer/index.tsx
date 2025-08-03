"use client";
import { Box, Container, Typography, Link as MuiLink, Stack, IconButton } from "@mui/material";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component='footer'
      sx={{
        py: 6,
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        mt: "auto",
      }}
    >
      <Container maxWidth='lg'>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 4, sm: 8, md: 12 }}
          justifyContent='space-between'
          mb={4}
        >
          {/* Navegación */}
          <Box>
            <Typography
              variant='h6'
              component='h3'
              gutterBottom
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Navegación
            </Typography>
            <Stack spacing={1}>
              <MuiLink
                href='/signin'
                component={Link}
                color='text.secondary'
                sx={{
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "none",
                  },
                }}
              >
                Iniciar sesión
              </MuiLink>
              <MuiLink
                href='/profile'
                component={Link}
                color='text.secondary'
                sx={{
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "none",
                  },
                }}
              >
                Mi perfil
              </MuiLink>
              <MuiLink
                href='/search'
                component={Link}
                color='text.secondary'
                sx={{
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "none",
                  },
                }}
              >
                Buscar productos
              </MuiLink>
            </Stack>
          </Box>

          {/* Contacto */}
          <Box>
            <Typography
              variant='h6'
              component='h3'
              gutterBottom
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Contacto
            </Typography>
            <Stack spacing={1}>
              <MuiLink
                href='mailto:bruno_am_22@hotmail.com'
                target='_blank'
                color='text.secondary'
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "none",
                  },
                }}
              >
                <EmailIcon fontSize='small' />
                bruno_am_22@hotmail.com
              </MuiLink>
            </Stack>
          </Box>

          {/* Redes Sociales */}
          <Box>
            <Typography
              variant='h6'
              component='h3'
              gutterBottom
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Redes Sociales
            </Typography>
            <Stack direction='row' spacing={2}>
              <IconButton
                href='https://brunoken.vercel.app' // Reemplaza con tu URL
                target='_blank'
                aria-label='Portafolio'
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "primary.main", // O el color que prefieras
                    backgroundColor: "rgba(25, 118, 210, 0.04)",
                  },
                }}
              >
                <WorkIcon />
              </IconButton>
              <IconButton
                href='https://www.linkedin.com/in/brunoken18/'
                target='_blank'
                aria-label='LinkedIn'
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "#0A66C2",
                    backgroundColor: "rgba(10, 102, 194, 0.04)",
                  },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                href='https://github.com/brunoken22'
                target='_blank'
                aria-label='GitHub'
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "text.primary",
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Stack>
          </Box>
        </Stack>

        {/* Copyright */}
        <Box
          sx={{
            pt: 4,
            borderTop: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Typography variant='body2' color='text.secondary'>
            © {currentYear}{" "}
            <MuiLink
              href='https://brunoken.vercel.app/'
              component={Link}
              color='text.primary'
              sx={{ fontWeight: 600, textDecoration: "none" }}
            >
              Bruno Ken
            </MuiLink>
            . Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
