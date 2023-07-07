"use client" 
import {ResponsiveAppBar} from "@/components/header"
import Footer from '@/components/footer'
import styled from 'styled-components'

const Div = styled.div`
   padding: 1.5rem;
   display: grid;
   grid-template-rows: auto 1fr;
   row-gap: 5rem;
`

export function MainLayout({children}:any){
   return(
      <>
         <ResponsiveAppBar/>
         <Div>
            {children}
         </Div>
         <Footer/>
      </>
   )
}