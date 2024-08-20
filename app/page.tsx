import {Buscador} from '@/components/buscador';
import {Destacados} from '@/components/destacados';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <>
      <div>
        <Typography
          variant='h1'
          component='h1'
          sx={{fontWeight: 'bold', textAlign: 'center'}}>
          El mejor <br></br>e-commerce
        </Typography>
        <Buscador />
      </div>
      <Destacados />
    </>
  );
}
