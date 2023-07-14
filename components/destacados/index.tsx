"use client"
import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Subtitle } from "@/ui/typography";
import Link from 'next/link';
import { index } from '@/lib/algolia';
import {useRecoilState} from 'recoil'
import { destacados } from '@/lib/atom';

export function Destacados(){
   const [destac,setDestac] = useRecoilState(destacados)
   const params = {
      hitsPerPage:4, // Número de elementos a obtener
      page: 0, // Página de resultados (0 para la primera página)
    };
   useEffect(()=>{
      index.search('',params)
      .then(({ hits }:any) => {
         setDestac(hits)
      })
      .catch((error:any) => {
         console.error(error);
      });
   },[]) 

   return (
      <div>
         <Subtitle>Productos Destacados</Subtitle>
         <div style={{padding:"1rem",display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center"}}>
            {destac?.map((el:any,pos)=>{ return<Link href={"/product/"+el.objectID} key={pos} style={{textDecoration:"none"}}> <ThemplateDestacados id={el.objectID} price={el["Unit cost"]} title={el.Name} img={el.Images}/></Link>})}
         </div>
      </div>
   )
}



export function ThemplateDestacados(props:any){
   
   return (
      <div id={props.id}>
         <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
            <CardMedia
               component="img"
               height="140"
               image={props.img[0].url}
               alt="green iguana"
            />
            <CardContent>
               <Typography gutterBottom variant="h5" component="div">
                  $ {props.price}
               </Typography>
               <Typography variant="body2" color="text.secondary">
                  {props.title}
               </Typography>
            </CardContent>
            </CardActionArea>
         </Card>
      </div>
   )
}