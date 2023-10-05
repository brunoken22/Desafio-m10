'use client';

import {useRecoilValue} from 'recoil';
import {favoritos, Favorito} from '@/lib/atom';
import {DivContainerFavorito, TempleFavorito} from './styled';
import {Subtitle, Title} from '@/ui/typography';
import Button from '@mui/material/Button';
import {useOrder} from '@/lib/hooks';
import {FormEvent, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useFavorite} from '@/lib/hooks';

export function FavoritoComp() {
  const router = useRouter();
  const datafavoritos = useRecoilValue(favoritos);
  const [id, setId] = useState('');
  const [favorito, setfavorito] = useState(false);
  const token =
    typeof localStorage !== 'undefined' ? localStorage?.getItem('token') : null;
  const {dataFavorite} = useFavorite(token, id);
  useEffect(() => {
    if (dataFavorite) {
      setId('');
    }
  }, [dataFavorite]);
  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    const orderResData = await useOrder(
      localStorage?.getItem('token') || '',
      e.currentTarget.id
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
            />
          </Link>
          <div style={{textAlign: 'start', width: '100%'}}>
            <Link
              href={'/product/' + favorito.id}
              style={{color: 'inherit', textDecoration: 'none'}}>
              <Subtitle style={{textAlign: 'start', fontWeight: '500'}}>
                {favorito.name}
              </Subtitle>
            </Link>

            <span>
              <strong>${favorito.price}</strong>
            </span>
          </div>
          <Button variant='contained' onClick={handleClick} id={favorito.id}>
            Comprar
          </Button>
          <IconButton
            id={favorito.id}
            aria-label='delete'
            size='large'
            onClick={handleFavorite}>
            <DeleteIcon />
          </IconButton>
        </TempleFavorito>
      ))}
    </DivContainerFavorito>
  ) : null;
}
