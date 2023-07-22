"use client"
import { Buscador } from '@/components/buscador';
import { Destacados } from '@/components/destacados';
import { Title } from '@/ui/typography'
import styled from 'styled-components'

const Div= styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`
export default function Home() {
  return (
    <>
      <Div>
        <Title $bg="#000">El mejor <br></br>e-commerce</Title>
        <Buscador cambiaremos={()=>{}}/>
      </Div>
      <Destacados/>
    </>
  )
}
