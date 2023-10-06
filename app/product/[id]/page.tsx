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
export default function ProductId({params}: any) {
  const router = useRouter();
  const datafavoritos = useRecoilValue(favoritos);
  const {data, isLoading} = useProduct(params.id);
  const [id, setId] = useState('');
  const [favorito, setfavorito] = useState(false);

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
      params.id
    );
    if (orderResData?.url) {
      router.push(orderResData.url);
    }
  };
  const handleFavorite = (e: FormEvent) => {
    e.preventDefault();
    setfavorito(!favorito);
    setId(params.id);
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '80%',
        margin: '0 auto',
        gap: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <CarouselComp img={data ? data.Images : null} />
      <DivContenedorProduct>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <Subtitle>{data ? data.Name : null}</Subtitle>
          <Subtitle>${data ? data['Unit cost'] : null}</Subtitle>
          <StartButton onClick={handleFavorite} $favorite={favorito}>
            <StarSVG />
          </StartButton>
        </div>
        <Button variant='contained' onClick={handleClick}>
          Comprar
        </Button>
        <div
          style={{
            textAlign: 'start',
            display: 'flex',
            flexDirection: 'column',
            rowGap: ' 1rem',
            alignItems: 'center',
            paddingLeft: '1rem',
          }}>
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
        </div>
      </DivContenedorProduct>
    </div>
  );
}
