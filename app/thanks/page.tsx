'use client';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
export default function Thanks() {
  return (
    <div style={{textAlign: 'center', margin: 'auto'}}>
      <Image src={'/giphy.gif'} alt='Gracias' width={100} height={100} />
      <Typography variant='h1' fontSize={'1.5rem'}>
        Muchas gracias por tu compra!
      </Typography>
      <h4 style={{marginTop: '2rem', marginBottom: '2.5rem'}}>
        En la brevedad le llegara mas informacion sobre el envío
      </h4>
      <Link href={'/'}>
        <Button>Volver a la Inicio</Button>
      </Link>
    </div>
  );
}
