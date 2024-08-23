'use client';
import {CarouselComp} from '@/components/carousel';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {FormEvent, useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useOrder, useProduct, useFavorite} from '@/lib/hooks';
import {Loader} from '@/ui/loader';
import StarSVG from '@/ui/icons/star.svg';
import {favoritos, Favorito} from '@/lib/atom';
import {useRecoilValue} from 'recoil';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import Select from '@mui/material/Select/Select';
import Box from '@mui/material/Box/Box';
import {Typography} from '@mui/material';
import './styled.css';

export default function ProductId({params}: any) {
  const router = useRouter();
  const datafavoritos = useRecoilValue(favoritos);
  const {data, isLoading} = useProduct(params.id);
  const [id, setId] = useState('');
  const [favorito, setfavorito] = useState(false);
  const [cantidadProduct, setCantidadProduct] = useState(1);

  const token =
    typeof localStorage !== 'undefined'
      ? localStorage?.getItem('tokenEcommerce')
      : '';
  useFavorite(token, id);
  useEffect(() => {
    if (datafavoritos) {
      const isfavorito = datafavoritos.find((e: Favorito) => e.id == params.id);
      if (isfavorito) {
        setfavorito(true);
        return;
      }
      setfavorito(false);
    }
  }, [datafavoritos]);
  useEffect(() => {
    if (id) {
      setId('');
    }
  }, [id]);

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      router.push('/signin');
      return;
    }
    const orderResData = await useOrder(token as string, params.id, {
      cantidad: cantidadProduct <= 0 ? 1 : Number(cantidadProduct),
    });
    if (orderResData?.url) {
      router.push(orderResData.url);
    }
  };
  const handleFavorite = (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      router.push('/signin');
      return;
    }
    setfavorito(!favorito);
    setId(params.id);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='container_Productid'>
      <CarouselComp img={data ? data.Images : null} />
      <Box
        maxWidth={'579px'}
        display={'flex'}
        flexDirection={'column'}
        gap={'1rem'}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            position: 'relative',
          }}>
          <Typography fontSize={'1.5rem'} variant='h1'>
            {data ? data.Name : null}
          </Typography>
          <Typography fontSize={'1.2rem'} variant='h3'>
            ${data ? data['Unit cost'] : null}
          </Typography>
          <button
            onClick={handleFavorite}
            className={`button_productId_favorite ${
              favorito ? 'productId_favorite_true' : ''
            }`}>
            <StarSVG />
          </button>
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
        <Button variant='contained' onClick={handleClick}>
          Comprar
        </Button>
        <div>
          <Typography variant='body2'>
            <CheckCircleOutlineIcon />
            {data ? (data['In stock'] ? 'Stock disponible' : null) : null}{' '}
          </Typography>
          <Typography variant='body2' fontWeight={'100'}>
            <strong> Sobre este producto: </strong>
            {data ? data.Description : null}
          </Typography>
        </div>
      </Box>
    </div>
  );
}
