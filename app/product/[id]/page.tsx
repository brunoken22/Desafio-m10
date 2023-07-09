"use client"
import { CarouselComp } from "@/components/carousel"
import { Body, Subtitle } from "@/ui/typography"
import Button from "@mui/material/Button"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useEffect } from "react";
import { destacados } from "@/lib/api";
export  default async function ProductId({params}:any){
   console.log(params)
   useEffect(() => {
    
    }, []);
   return(
      <div style={{display:"flex", width: "80%",margin: "0 auto"}}>
         <CarouselComp/>
         <div style={{display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center"}}>
            <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
               <Subtitle>Celular movistar g100</Subtitle>
               <Subtitle>$50.000</Subtitle>
            </div>   
            <Button variant="contained">Comprar</Button>
            <div style={{textAlign:"start",display: "flex",flexDirection:"column",rowGap:" 1rem",alignItems:"start",paddingLeft:"1rem"}}>
               <Body $bg="#169f4e" $style={{"align-items": "center",display: "flex",gap: "0.2rem"}}> <CheckCircleOutlineIcon/> Stock disponible</Body>
               <Body $bg="#000"><strong> Sobre este producto: </strong> No te pierdas de un solo momento con el nuevo Motorola Moto G32. Con su cámara de 50+8+2+2 MP; sacá fotos nítidas y claras tanto de día como de noche. El Motorola Moto G32 posee un procesador Octa-Core 2.3 GHz para que disfrutes de todas tus aplicaciones sin inconvenientes. Memoria interna de 128 GB y expandible con una MicroSd hasta 1TB.</Body>
            </div>
         </div>
   </div>
   )
}