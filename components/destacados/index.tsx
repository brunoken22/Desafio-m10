'use client';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Link from 'next/link';
import {search} from '@/lib/hooks';
import Box from '@mui/material/Box';

export function Destacados() {
  const {data} = search({q: 'des', limit: 3, offset: 0});
  return (
    <Box alignItems={'center'} sx={{padding: '4rem'}}>
      <Typography
        variant='h2'
        fontSize={{
          xs: '1.1rem',
          sm: '1.3rem',
          md: '1.6rem',
          lg: '2rem',
        }}
        fontWeight={'500'}
        textAlign={'center'}>
        Productos Destacados
      </Typography>
      <Box
        sx={{
          padding: '1rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {data
          ? data.results?.map((el: any, pos: any) => {
              return (
                <Link
                  href={'/product/' + el.objectID}
                  key={pos}
                  style={{textDecoration: 'none'}}>
                  {' '}
                  <ThemplateDestacados
                    id={el.objectID}
                    price={el['Unit cost']}
                    title={el.Name}
                    img={el.Images}
                  />
                </Link>
              );
            })
          : [1, 2, 3].map((e: number) => (
              <Card
                sx={{
                  width: 280,
                  height: 290,
                  display: 'flex',
                  flexDirection: 'column',
                }}
                key={e}>
                <div></div>
                <div></div>
              </Card>
            ))}
      </Box>
    </Box>
  );
}
export function ThemplateDestacados(props: any) {
  return (
    <div id={props.id}>
      <Card sx={{width: 280}}>
        <CardActionArea>
          <CardMedia
            component='img'
            height='200'
            image={props.img[0].url}
            alt='x'
            loading='lazy'
            sx={{objectFit: 'contain'}}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              $ {props.price}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {props.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
