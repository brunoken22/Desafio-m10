'use client';
import {Title} from '@/ui/typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
export default function Thanks() {
  return (
    <div style={{textAlign: 'center', marginTop: '20%'}}>
      <Image src={'/giphy.gif'} alt='Gracias' height={100} />
      <Title $bg='#000'>Muchas gracias por tu compra!</Title>
      <h4 style={{marginTop: '2rem', marginBottom: '2.5rem'}}>
        En la brevedad le llegara mas informacion sobre el envío
      </h4>
      <Link href={'/'}>
        <Button>Volver a la Home</Button>
      </Link>
    </div>
  );
}
