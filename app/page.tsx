"use client"

import { Buscador } from '@/components/buscador';
import { Destacados } from '@/components/destacados';
import { Title } from '@/ui/typography'


export default function Home() {
  const prueba = (data:any)=>{
  }

  return (
    <>
      <Title $bg="#000">El mejor <br></br>e-commerce</Title>
      <Buscador cambiaremos={prueba}/>
      <Destacados/>
    </>
  )
}
