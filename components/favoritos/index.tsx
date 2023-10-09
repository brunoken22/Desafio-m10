'use client';

import {useRecoilValue} from 'recoil';
import {favoritos, Favorito} from '@/lib/atom';
import {DivContainerFavorito, TempleFavorito, DivIconEliminar} from './styled';
import {Subtitle, Title} from '@/ui/typography';
import Button from '@mui/material/Button';
import {useOrder} from '@/lib/hooks';
import {FormEvent, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useFavorite} from '@/lib/hooks';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Select from '@mui/material/Select/Select';

export function FavoritoComp() {
  const router = useRouter();
  const datafavoritos = useRecoilValue(favoritos);
  const [id, setId] = useState('');
  const [favorito, setfavorito] = useState(false);
  const [cantidadProduct, setCantidadProduct] = useState(1);

  const token =
    typeof localStorage !== 'undefined'
      ? localStorage?.getItem('tokenEcommerce')
      : null;
  const {dataFavorite} = useFavorite(token, id);
  useEffect(() => {
    if (dataFavorite) {
      setId('');
    }
  }, [dataFavorite]);
  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      router.push('/signin');
      return;
    }
    const orderResData = await useOrder(
      localStorage?.getItem('tokenEcommerce') || '',
      e.currentTarget.id,
      {
        cantidad: cantidadProduct <= 0 ? 1 : Number(cantidadProduct),
      }
    );
    if (orderResData?.url) {
      router.push(orderResData.url);
    }
  };
  const handleFavorite = (e: FormEvent) => {
    e.preventDefault();
    setfavorito(!favorito);
    e.currentTarget.id;
    setId(e.currentTarget.id);
  };
  return datafavoritos ? (
    <DivContainerFavorito>
      <Title $bg={'true'}>Favoritos</Title>
      {datafavoritos.map((favorito: Favorito) => (
        <TempleFavorito key={favorito.id}>
          <Link href={'/product/' + favorito.id}>
            <img
              src={favorito.img}
              alt={favorito.name}
              height={100}
              width={100}
              style={{objectFit: 'contain'}}
            />
          </Link>
          <div style={{width: '100%'}}>
            <Link
              href={'/product/' + favorito.id}
              style={{color: 'inherit', textDecoration: 'none'}}>
              <h3 style={{fontWeight: '500'}}>{favorito.name}</h3>
            </Link>
            <span>
              <strong style={{fontWeight: '900'}}>${favorito.price}</strong>
            </span>
          </div>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': {m: 1, width: '70px'},
            }}
            noValidate
            autoComplete='off'>
            <InputLabel id='demo-simple-select-label'>Cantidad</InputLabel>
            <Select
              value={cantidadProduct}
              label='Cantidad'
              onChange={(e: any) => setCantidadProduct(e.target.value)}>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
            </Select>
          </Box>
          <Button
            variant='contained'
            onClick={handleClick}
            id={favorito.id}
            size='medium'>
            Comprar
          </Button>
          <DivIconEliminar>
            <IconButton
              id={favorito.id}
              aria-label='delete'
              size='large'
              onClick={handleFavorite}>
              <DeleteIcon />
            </IconButton>
          </DivIconEliminar>
        </TempleFavorito>
      ))}
    </DivContainerFavorito>
  ) : null;
}
