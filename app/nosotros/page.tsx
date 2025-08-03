"use client";
import { Box, Typography, Container, Grid, Avatar, Paper, Divider, Button } from "@mui/material";
import Image from "next/image";

export default function AboutPage() {
  return (
    <Container maxWidth='lg' sx={{ py: 6 }}>
      <Paper
        elevation={0}
        sx={{ p: 4, mb: 6, borderRadius: 2, backgroundColor: "background.paper" }}
      >
        <Typography
          variant='h2'
          component='h1'
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "primary.main",
            textAlign: "center",
            mb: 4,
          }}
        >
          Sobre este proyecto
        </Typography>

        <Grid container spacing={4}>
          <Grid item>
            <Typography variant='h5' gutterBottom sx={{ fontWeight: 600 }}>
              Mi Tienda Virtual
            </Typography>
            <Typography paragraph sx={{ mb: 3 }}>
              Este proyecto es una demostración de mis habilidades como desarrollador full-stack. He
              creado una tienda e-commerce completa con funcionalidades modernas para mostrar en mi
              portfolio profesional.
            </Typography>
            <Typography paragraph sx={{ mb: 3 }}>
              La aplicación incluye autenticación de usuarios, carrito de compras, búsqueda de
              productos y favoritos.
            </Typography>
            <Typography paragraph>
              Tecnologías utilizadas: Next.js, React, Material-UI, Node.js, Firebase y más.
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography variant='h6' gutterBottom sx={{ fontWeight: 600 }}>
                Características principales:
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                  <Typography>Diseño responsive y accesible</Typography>
                </li>
                <li>
                  <Typography>Autenticación segura con JWT</Typography>
                </li>
                <li>
                  <Typography>Filtrado y búsqueda avanzada</Typography>
                </li>
                <li>
                  <Typography>Estado global con Recoil</Typography>
                </li>
                <li>
                  <Typography>Optimización de rendimiento</Typography>
                </li>
              </ul>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Divider sx={{ my: 6 }} />

      <Box sx={{ textAlign: "center" }}>
        <Typography variant='h5' component='h3' gutterBottom sx={{ fontWeight: 600 }}>
          ¿Te interesa este proyecto?
        </Typography>
        <Typography paragraph sx={{ mb: 3 }}>
          Este código está disponible en mi repositorio de GitHub como parte de mi portfolio.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          size='large'
          href='https://brunoken.vercel.app/'
          target='_blank'
          component='a'
          sx={{ px: 4, py: 1.5 }}
        >
          Ver mi portafolio
        </Button>
      </Box>
    </Container>
  );
}
