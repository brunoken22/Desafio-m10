"use client"
import { CarouselComp } from "@/components/carousel"
import { Body, Subtitle } from "@/ui/typography"
import Button from "@mui/material/Button"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useEffect } from "react";
import { useState } from "react";
import {useProduct} from '@/lib/hooks'

export  default  function ProductId({params}:any){
   const [product,setProduct] =useState({})

   const data = useProduct("/api/products/"+params.id)
   useEffect(() => {
      setProduct(data)
      
   }, [params.id]);
   
   return(
      <div style={{display:"flex", width: "80%",margin: "0 auto"}}> 
         <CarouselComp img={data?data.Images:null}/>
         <div style={{display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center"}}>
            <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
               <Subtitle>{data?data.Name:null}</Subtitle>
               <Subtitle>${data?data["Unit cost"]:null}</Subtitle>
            </div>   
            <Button variant="contained">Comprar</Button>
            <div style={{textAlign:"start",display: "flex",flexDirection:"column",rowGap:" 1rem",alignItems:"start",paddingLeft:"1rem"}}>
               <Body $bg="#169f4e" $style={{"align-items": "center",display: "flex",gap: "0.2rem"}}><CheckCircleOutlineIcon/>{data?data["In stock"]?"Stock disponible":null:null} </Body>
               <Body $bg="#000"><strong> Sobre este producto: </strong>{data?data.Description:null}</Body>
            </div>
         </div>
   </div>
   )
}