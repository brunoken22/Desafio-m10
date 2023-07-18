"use client" 
import Image from 'next/image'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import  Link from 'next/link';
import { useMe } from '@/lib/hooks';
import { couldStartTrivia } from 'typescript';
import styled from 'styled-components'
import { useEffect } from 'react';

const Div = styled.div`
  @media(max-width: 900px){
    font-size: 1rem;
  }
`

const pages = [{link:'Productos',url:"/search"}, {link:'Sobre nosotros',url:"/prueba"}];
const settings = [{link:'Perfil', url:"/profile"}, {link:'Inicio sesión',url:"/signin"}, {link:'Cerrar sesión'}];

function ResponsiveAppBar() {

  const {data} = useMe(typeof localStorage !== 'undefined' ?localStorage?.getItem("token"):null)

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  useEffect(()=>{

  },[data])

  const handleCerrar = (e:any)=>{
    e.preventDefault()
    if(typeof localStorage !== 'undefined' )localStorage?.removeItem("token")
    return null
  }
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="primary" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                  <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center"><Link href={page.url} style={{color:"inherit",backgroundColor:"inherit",textDecoration:"none"}}>{page.link}</Link></Typography>  
                  </MenuItem>
                
              ))}
            </Menu>
          </Box>
          <Link href={"/"}>  <Image
            src="https://res.cloudinary.com/dy26iktoi/image/upload/v1688595425/logo_mzoa3e.png"
            height={60}
            width={50}
            alt='logo'
          /></Link>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link href={page.url} key={page.link}>
                <Button
                
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.link}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 ,display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Tooltip title="Configuracion">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Bruno Ken" src="https://media.licdn.com/dms/image/D4D03AQGJU199CoxKCw/profile-displayphoto-shrink_800_800/0/1679415835413?e=1694044800&v=beta&t=_zI82x2Z4fPkzG3x7UoXmTwwfVnxzHFpCqISJzt1Jbc" /> */}
                <Div><Typography  sx={{ my: 2, color: 'white', display: 'block',margin:0,padding:0 ,cursor:"pointer" }}>{data?.email ||null}</Typography></Div>
              </IconButton>
            </Tooltip>
                {!data?.email ? <Link href={"/signin"}><Typography  sx={{ my: 2, color: 'white', display: 'block',margin:0,padding:0,textDecoration:"none" }}>Inicio Sesión</Typography> </Link>:null}
            {data?.email?<Div><Button  sx={{ my: 2, color: 'red', display: 'block',margin:0,padding:0 }} onClick={handleCerrar}>Cerrar Sesión</Button> </Div>:null}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.link} onClick={handleCloseUserMenu}>
                    <Link href={setting.url?setting.url:""} style={{color:"inherit",textDecoration:"none"}} onClick={setting.url?handleCerrar:()=>{}}>
                      <Typography textAlign="center">{setting.link}</Typography>
                   </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export { ResponsiveAppBar};
