"use client"
import {FormularioSignin} from '@/components/signin'
import styled from 'styled-components'
import Link from 'next/link'
const Div = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   
`
export default async function Signin(){

   return (
      <Div>
         <h2>Inicio de sesión</h2>
         <FormularioSignin/>
         <p>No tenes cuenta,<Link href={"/logout"} style={{textDecoration:"none"}}> Registate</Link>?</p>
      </Div>
   )
}
   