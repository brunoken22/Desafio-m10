'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {FormEvent, useEffect, useState} from 'react';
import {useMe, useModMe} from '@/lib/hooks';
import {Loader} from '@/ui/loader';

export function Perfil() {
  const {data} = useMe(
    typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null
  );

  const [dataInfo, setDataInfo] = useState({
    email: '',
    name: '',
    direccion: '',
    telefono: '',
  });
  const [modData, setModData] = useState({
    data: {email: '', name: '', direccion: '', telefono: ''},
    authId: '',
  });
  const {modResData, modResLoading} = useModMe(
    typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null,
    modData
  );

  useEffect(() => {
    if (modResData?.email) {
      setDataInfo(modResData);
      return;
    }
    if (data?.email) {
      setDataInfo(data);
    }
  }, [data]);
  if (modResLoading || modResLoading) {
    return <Loader></Loader>;
  }

  const handleSumit = (e: FormEvent) => {
    e.preventDefault();
    setModData({
      data: {
        email: dataInfo.email,
        name: (e.target as HTMLFormElement).fullname.value,
        direccion: (e.target as HTMLFormElement).direccion.value,
        telefono: (e.target as HTMLFormElement).telefono.value,
      },
      authId:
        typeof localStorage !== 'undefined'
          ? (localStorage.getItem('authId') as string)
          : '',
    });
  };

  return (
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
      onSubmit={handleSumit}>
      <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
        <TextField
          id='fullname'
          name='fullname'
          label='Nombre'
          type='text'
          value={dataInfo.name || ''}
          variant='standard'
          onChange={(e: any) =>
            setDataInfo((prev: any) => ({...prev, name: e.target.value}))
          }
          fullWidth
          required
        />
      </Box>
      <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
        <TextField
          id='direccion'
          name='direccion'
          label='Direccion'
          type='text'
          variant='standard'
          value={dataInfo.direccion || ''}
          onChange={(e: any) =>
            setDataInfo((prev: any) => ({...prev, direccion: e.target.value}))
          }
          fullWidth
          required
        />
      </Box>
      <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
        <TextField
          id='telefono'
          name='telefono'
          label='Telefono'
          type='tlf'
          variant='standard'
          value={dataInfo.telefono || ''}
          onChange={(e: any) =>
            setDataInfo((prev: any) => ({...prev, telefono: e.target.value}))
          }
          fullWidth
          required
        />
      </Box>
      <Button type='submit' variant='contained' style={{color: '#fff'}}>
        Guardar
      </Button>
    </Box>
  );
}
