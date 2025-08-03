"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { user } from "@/lib/atom";
import { useAuthUser } from "@/lib/hooks";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Productos", path: "/search" },
  { label: "Sobre nosotros", path: "/nosotros" },
];

const USER_MENU_ITEMS = [
  { label: "Perfil", path: "/profile" },
  { label: "Favoritos", path: "/favoritos" },
  { label: "Inicio sesión", path: "/signin" },
];

const LOGO_URL = "https://res.cloudinary.com/dy26iktoi/image/upload/v1688595425/logo_mzoa3e.webp";

export function ResponsiveAppBar() {
  const router = useRouter();
  const setUserData = useSetRecoilState(user);
  const { data } = useAuthUser();
  const [mounted, setMounted] = useState(false);

  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    if (data?.email) {
      setUserData(data);
    }
  }, [data, setUserData]);

  const handleOpenMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuAnchor(null);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = async () => {
    const { closeUser } = await import("@/lib/hooks");
    await closeUser();
    setTimeout(() => router.refresh(), 1000);
  };

  const isAuthenticated = !!data?.email;

  if (!mounted) {
    // Return a simplified version for SSR to match the initial client render
    return (
      <AppBar position='static' color='primary' elevation={0}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton size='large' color='inherit'>
                <MenuIcon />
              </IconButton>
            </Box>
            <Link href='/' passHref>
              <img
                src={LOGO_URL}
                alt='Logo'
                width={55}
                height={60}
                style={{ objectFit: "contain" }}
              />
            </Link>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button color='inherit'>Inicio Sesión</Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
  return (
    <AppBar position='static' color='primary' elevation={0}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='menu'
              aria-controls='mobile-menu'
              aria-haspopup='true'
              onClick={handleOpenMobileMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='mobile-menu'
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleCloseMobileMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {NAV_ITEMS.map((item) => (
                <MenuItem key={item.label} onClick={handleCloseMobileMenu}>
                  <Link
                    href={item.path}
                    style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                  >
                    <Typography textAlign='center'>{item.label}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo */}
          <Link href='/' passHref>
            <img
              src={LOGO_URL}
              alt='Logo'
              width={55}
              height={60}
              style={{ objectFit: "contain" }}
            />
          </Link>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 3 }}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.label}
                component={Link}
                href={item.path}
                sx={{
                  my: 2,
                  color: "white",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* User Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title='Configuración'>
                  <Typography
                    onClick={handleOpenUserMenu}
                    sx={{
                      color: "white",
                      cursor: "pointer",
                      fontWeight: 500,
                      "&:hover": { opacity: 0.8 },
                    }}
                  >
                    {data?.email}
                  </Typography>
                </Tooltip>

                <Button
                  onClick={handleLogout}
                  sx={{
                    color: "error.light",
                    "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.08)" },
                  }}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Button
                component={Link}
                href='/signin'
                sx={{
                  color: "white",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
                }}
              >
                Inicio Sesión
              </Button>
            )}

            {/* User Menu */}
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleCloseUserMenu}
              sx={{ mt: "45px" }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
            >
              {USER_MENU_ITEMS.map(
                (item) =>
                  isAuthenticated &&
                  item.label !== "Inicio sesión" && (
                    <MenuItem key={item.label} onClick={handleCloseUserMenu}>
                      <Link
                        href={item.path}
                        style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                      >
                        <Typography textAlign='center'>{item.label}</Typography>
                      </Link>
                    </MenuItem>
                  )
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
