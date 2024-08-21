import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Select from '@mui/material/Select/Select';
import Button from '@mui/material/Button';
import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Favorito} from '@/lib/atom';
import {useOrder} from '@/lib/hooks';

export function TemplateFavoriteComponent({
  favorito,
  token,
  modId,
}: {
  favorito: Favorito;
  token: string | null;
  modId: (dataId: string) => any;
}) {
  const router = useRouter();
  const [cantidadProduct, setCantidadProduct] = useState(1);

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      router.push('/signin');
      return;
    }
    const orderResData = await useOrder(token, e.currentTarget.id, {
      cantidad: cantidadProduct <= 0 ? 1 : Number(cantidadProduct),
    });
    if (orderResData?.url) {
      router.push(orderResData.url);
    }
  };

  const handleFavorite = (e: FormEvent) => {
    e.preventDefault();
    modId(e.currentTarget.id);
  };
  return (
    <div key={favorito.id}>
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
      <div>
        <IconButton
          id={favorito.id}
          aria-label='delete'
          size='large'
          onClick={handleFavorite}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}
