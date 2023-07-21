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
import {Loader} from '@/ui/loader'
import { search } from '@/lib/hooks'; 

export function Destacados(){
   const [destac,setDestac] = useRecoilState(destacados)
   const {data,isLoading} = search({q:"copy",limit:4,offset:6})

   useEffect(()=>{
     if(data){
      setDestac(data.results)
     }
   },[data])


   return (
      <div>
         <Subtitle>Productos Destacados</Subtitle>
         <div style={{padding:"1rem",display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center"}}>
            {destac?destac?.map((el:any,pos:any)=>{ return<Link href={"/product/"+el.objectID} key={pos} style={{textDecoration:"none"}}> <ThemplateDestacados id={el.objectID} price={el["Unit cost"]} title={el.Name} img={el.Images}/></Link>}):null}
         </div>
      </div>
   )
}
export function ThemplateDestacados(props:any){
   
   return (
      <div id={props.id}>
         <Card sx={{ width: 280}}>
            <CardActionArea>
            <CardMedia
               component="img"
               height="290"
               image={props.img[0].url}
               alt="x"
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