"use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Subtitle } from "@/ui/typography";
import Link from 'next/link';

export function Destacados(){
   return (
      <div>
         <Subtitle>Productos Destacados</Subtitle>
         <div style={{padding:"1rem",display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center"}}>
            {[1,2,3,4,5,6].map((el:any,pos)=><Link href={"/product/"+pos} key={pos}> <ThemplateDestacados id={pos}/></Link>)}
         </div>
      </div>
   )
}



function ThemplateDestacados(props:any){
   
   return (
      <div id={props.id}>
         <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
            <CardMedia
               component="img"
               height="140"
               image="https://johnfoosar.vtexassets.com/arquivos/ids/159275-800-auto?v=637844324464400000&width=800&height=auto&aspect=true"
               alt="green iguana"
            />
            <CardContent>
               <Typography gutterBottom variant="h5" component="div">
                  $35.000
               </Typography>
               <Typography variant="body2" color="text.secondary">
                  Zapatillas Nike talle 40
               </Typography>
            </CardContent>
            </CardActionArea>
         </Card>
      </div>
   )
}