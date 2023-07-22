import styled from 'styled-components'
import {Body} from '@/ui/typography'
import Facebook from "@/ui/icons/facebook.svg"
import Github from "@/ui/icons/github.svg"
import Linkedin from "@/ui/icons/linkedin.svg"
import Link from 'next/link'

const Footerr = styled.footer`
   background-color: #121212;
   color:#fff;
   padding: 1rem;
   display: grid;
   row-gap: 1rem;
`
const Enla = styled.a`  
   text-decoration: none;
   color:#fff;
`

const Div = styled.div<any>`
   display: ${(props):any=>(props.$display) || "block"} ;
   flex-direction:  ${(props):any=>(props.$dire) || "column"};
   align-items:  ${(props):any=>(props.$aling) || ""};
   justify-content:space-between;
   row-gap: 0.5rem;
   
  @media (max-width: 350px) {
      flex-direction: column;
      row-gap: ${(props):any=>props.$dire? "1.5rem":"inherint"};

   }
`


export  function Footer(){

return(
   <Footerr >
      <Div $display="flex" $dire="row" $aling="center">
         <Div $display="flex" >
               <Link href={"/signin"} style={{textDecoration:"none" ,color:"inherit"}}><Body>Login</Body></Link>
               <Link href={"/profile"} style={{textDecoration:"none" ,color:"inherit"}}><Body>Mi Perfil</Body></Link>
               <Link href={"/search"} style={{textDecoration:"none" ,color:"inherit"}}><Body>Buscar</Body></Link>
         </Div>
         <Div $display="flex" >
            <Body> Redes</Body>
            <Enla href={"#"}><Body><Facebook/>Facebook</Body></Enla>
            <Enla href={"https://www.linkedin.com/in/brunoken18/"}><Body><Linkedin/> Linkedin</Body></Enla>
            <Enla href={"https://github.com/brunoken22"}><Body><Github/> GitGub</Body></Enla>
         </Div>
      </Div>
      <Div>
         <Body>@2023 <strong>Bruno ken</strong></Body>
      </Div>
   </Footerr>
)
}