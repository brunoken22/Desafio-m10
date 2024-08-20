'use client';
import {Favorito} from '@/lib/atom';
import {useGetAllFavorite} from '@/lib/hooks';
import {useEffect, useState} from 'react';
import {useFavorite} from '@/lib/hooks';
import {TemplateFavoriteComponent} from '../template';
import {Card} from '@mui/material';
import Typography from '@mui/material/Typography';

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
    <div suppressHydrationWarning={true}>
      <Typography variant='h1' fontSize={'1.5rem'}>
        Favoritos
      </Typography>
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
                <div suppressHydrationWarning={true}></div>
                <div suppressHydrationWarning={true}></div>
              </Card>
            ))
          : null}
      </>
    </div>
  );
}
