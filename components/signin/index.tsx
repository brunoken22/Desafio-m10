'use client';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import {useEffect, useState} from 'react';
import {useAuth, useToken} from '@/lib/hooks';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import {useRouter} from 'next/navigation';
import {useSetRecoilState} from 'recoil';
import {user} from '@/lib/atom';
import {Loader} from '@/ui/loader';
import Typography from '@mui/material/Typography';

export function FormularioSignin() {
  const setDataUser = useSetRecoilState(user);
  const router = useRouter();
  const [data, setData] = useState({
    email: '',
    name: '',
  });
  const [error, setError] = useState({
    error: false,
    message: '',
  });
  const [code, setCode] = useState('');
  const {token, isLoading} = useToken({code, email: data.email});
  const darCod = useAuth(data);
  useEffect(() => {
    if (token?.login) {
      setDataUser(token);
      setTimeout(() => {
        router.refresh();
      }, 1000);
    }
  }, [token]);
  if (isLoading) {
    return <Loader></Loader>;
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setData({email: e.target.email.value, name: e.target.name.value});
    const regex =
      /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(e.target.email.value)) {
      setError({
        error: false,
        message: '',
      });
      if (darCod?.data?.code) {
        alert('Codigo enviado a tu email');
      }
    } else {
      setError({
        error: true,
        message: 'Formato de email incorrrecto',
      });
    }
  };
  const handleSubmitCode = (e: any) => {
    e.preventDefault();
    setCode(e.target.code.value);
  };

  return (
    <>
      {!darCod?.data?.code ? (
        <>
          <Typography
            variant='h2'
            component='h1'
            sx={{fontSize: '2.5rem', fontWeight: 'bold'}}>
            Inicio de sesión
          </Typography>
          <Box
            component='form'
            sx={{'& > :not(style)': {m: 1}}}
            style={{
              color: '#000',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100%',
              minWidth: '30%',
            }}
            onSubmit={handleSubmit}>
            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
              <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}} />
              <TextField
                id='name'
                name='name'
                label='Nombre'
                type='text'
                variant='standard'
                fullWidth
                required
              />
            </Box>
            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
              <AlternateEmailIcon
                sx={{color: 'action.active', mr: 1, my: 0.5}}
              />
              <TextField
                id='email'
                label='Email'
                name='email'
                type='email'
                variant='standard'
                error={error.error}
                helperText={error.message}
                fullWidth
                required
              />
            </Box>
            <Button type='submit' variant='contained' style={{color: '#fff'}}>
              Ingresar
            </Button>
          </Box>
        </>
      ) : null}
      {darCod?.data?.code ? (
        <>
          <h2>Inicio de sesión</h2>
          <Box
            component='form'
            sx={{'& > :not(style)': {m: 1}}}
            style={{
              color: '#000',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100%',
              minWidth: '30%',
            }}
            onSubmit={handleSubmitCode}>
            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
              <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}} />
              <TextField
                id='code'
                name='code'
                label='Código'
                type='number'
                variant='standard'
                fullWidth
                required
              />
            </Box>
            <p style={{textAlign: 'center'}}>
              Te envíamos un código a tu mail <br></br>
              <span style={{color: '#6435d1'}}>{data ? data.email : null}</span>
            </p>
            <Button type='submit' variant='contained' style={{color: '#fff'}}>
              Ingresar
            </Button>
          </Box>
        </>
      ) : null}
    </>
  );
}
