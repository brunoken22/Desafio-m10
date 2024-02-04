'use client';
import {Favorito} from '@/lib/atom';
import {DivContainerFavorito} from './styled';
import {Title} from '@/ui/typography';
import {useGetAllFavorite} from '@/lib/hooks';
import {useEffect, useState} from 'react';
import {useFavorite} from '@/lib/hooks';
import {TemplateFavoriteComponent} from '../template';
import {Card} from '@mui/material';
import {DivTemplatePreProducLoader} from '../destacados/styled';

export function FavoritoComp() {
  const [id, setId] = useState('');
  const token =
    typeof localStorage !== 'undefined'
      ? localStorage?.getItem('tokenEcommerce')
      : null;
  const {dataFavorite} = useFavorite(token, id);
  const {data, isLoading} = useGetAllFavorite(token);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  });
  useEffect(() => {
    if (dataFavorite) {
      setId('');
    }
  }, [dataFavorite]);

  return (
    <DivContainerFavorito suppressHydrationWarning={true}>
      <Title $bg={'true'}>Favoritos</Title>
      {data?.length && hydrated
        ? data.map((favorito: Favorito) => (
            <TemplateFavoriteComponent
              favorito={favorito}
              key={favorito.id}
              token={token}
              modId={(dataId) => setId(dataId)}
            />
          ))
        : !isLoading &&
          hydrated && (
            <p style={{textAlign: 'center', marginTop: '1rem'}}>
              No hay productos
            </p>
          )}
      <>
        {isLoading && hydrated
          ? [1, 2, 3, 4, 5].map((e: number) => (
              <Card
                key={e}
                sx={{
                  width: '100%',
                  height: 100,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                <DivTemplatePreProducLoader
                  hei='25%'
                  suppressHydrationWarning={true}></DivTemplatePreProducLoader>
                <DivTemplatePreProducLoader
                  hei='65%'
                  suppressHydrationWarning={true}></DivTemplatePreProducLoader>
              </Card>
            ))
          : null}
      </>
    </DivContainerFavorito>
  );
}
