"use client"
import { CarouselComp } from "@/components/carousel"
import { Body, Subtitle } from "@/ui/typography"
import Button from "@mui/material/Button"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { FormEvent, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {useOrder, useProduct} from '@/lib/hooks'

export  default async  function ProductId({params}:any){
   const router = useRouter()
   const [product,setProduct] =useState({})
   const data = useProduct("/api/products/"+params.id)
   useEffect(() => {
      setProduct(data)

   }, [params.id,data]);

   const handleClick = async(e:FormEvent)=>{
      e.preventDefault()
   const orderResData=await useOrder(localStorage?.getItem("token")||"",params.id)
      
      console.log(orderResData)
      if(orderResData?.url){
         window.open(orderResData.url,'_blank');
      }
   }
   return(
      <div style={{display:"flex", width: "80%",margin: "0 auto",gap:"2rem",flexWrap:"wrap",justifyContent:"center"}}> 
         <CarouselComp img={data?data.Images:null}/>
         <div style={{display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap:"1rem",
            maxWidth:"700px",
            alignItems: "center"}}>
            <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
               <Subtitle>{data?data.Name:null}</Subtitle>
               <Subtitle>${data?data["Unit cost"]:null}</Subtitle>
            </div>   
            <Button variant="contained" onClick={handleClick}>Comprar</Button>
            <div style={{textAlign:"start",display: "flex",flexDirection:"column",rowGap:" 1rem",alignItems:"start",paddingLeft:"1rem"}}>
               <Body $bg="#169f4e" $style={{"align-items": "center",display: "flex",gap: "0.2rem"}}><CheckCircleOutlineIcon/>{data?data["In stock"]?"Stock disponible":null:null} </Body>
               <Body $bg="#000"><strong> Sobre este producto: </strong>{data?data.Description:null}</Body>
            </div>
         </div>
   </div>
   )
}