'use client';

import {useRecoilValue} from 'recoil';
import {favoritos, Favorito} from '@/lib/atom';
import {DivContainerFavorito, TempleFavorito} from './styled';
import {Subtitle} from '@/ui/typography';
import Button from '@mui/material/Button';
import {useOrder} from '@/lib/hooks';
import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

export function FavoritoComp() {
  const router = useRouter();
  const datafavoritos = useRecoilValue(favoritos);
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
  return datafavoritos ? (
    <DivContainerFavorito>
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
          <div>
            <Subtitle>{favorito.name}</Subtitle>
            <span>
              <strong>{favorito.price}</strong>
            </span>
          </div>
          <Button variant='contained' onClick={handleClick} id={favorito.id}>
            Comprar
          </Button>
        </TempleFavorito>
      ))}
    </DivContainerFavorito>
  ) : null;
}
