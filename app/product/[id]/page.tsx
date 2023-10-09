'use client';
import {CarouselComp} from '@/components/carousel';
import {Body, Subtitle} from '@/ui/typography';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {FormEvent, useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useOrder, useProduct, useFavorite} from '@/lib/hooks';
import {Loader} from '@/ui/loader';
import StarSVG from '@/ui/icons/star.svg';
import {StartButton} from '@/ui/buttons';
import {DivContenedorProduct} from '@/ui/container';
import {favoritos, Favorito} from '@/lib/atom';
import {useRecoilValue} from 'recoil';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import Select from '@mui/material/Select/Select';
import Box from '@mui/material/Box/Box';
import {DivCantidadCompra, DivProductId} from '@/components/productoId/styled';
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
      : null;
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
  if (isLoading) {
    return <Loader />;
  }
  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    const orderResData = await useOrder(
      localStorage?.getItem('token') || '',
      params.id,
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
    if (!token) {
      console.log(token);
      router.push('/signin');
      return;
    }

    setfavorito(!favorito);
    setId(params.id);
  };

  return (
    <DivProductId>
      <CarouselComp img={data ? data.Images : null} />
      <DivContenedorProduct>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <Subtitle>{data ? data.Name : null}</Subtitle>
          <Subtitle>${data ? data['Unit cost'] : null}</Subtitle>
          <StartButton onClick={handleFavorite} $favorite={favorito}>
            <StarSVG />
          </StartButton>
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
        <DivCantidadCompra>
          <Body
            $bg='#169f4e'
            $style={{'align-items': 'center', display: 'flex', gap: '0.2rem'}}>
            <CheckCircleOutlineIcon />
            {data ? (data['In stock'] ? 'Stock disponible' : null) : null}{' '}
          </Body>
          <Body $bg='#000'>
            <strong> Sobre este producto: </strong>
            {data ? data.Description : null}
          </Body>
        </DivCantidadCompra>
      </DivContenedorProduct>
    </DivProductId>
  );
}
