import styled from 'styled-components'
import {Body} from '@/ui/typography'

const Footerr = styled.footer`
   background-color: #000;
   color:#fff;
   padding: 1rem;
   display: grid;
   row-gap: 1rem;
`
const Div = styled.div<any>`
   display: ${(props):any=>(props.display)};
   justify-content:space-between;
`

const H4 = styled.h4`
  
`
export default function Footer(){

   return(
      <Footerr >
         <Div display="flex">
            <Div>
               <Div>
                  <Body>Login</Body>
                  <Body>Mi Perfil</Body>
                  <Body>Buscar</Body>
                  <Body>Logout</Body>
               </Div>
            </Div>
            <Div>
               <H4>Redes</H4>
               <Body>Linkedin</Body>
               <Body>GitGub</Body>
            </Div>
         </Div>
         <Div>
            <Body>@2023 <strong>Bruno ken</strong></Body>
         </Div>
      </Footerr>
   )
}