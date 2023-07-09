"use client"
import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Subtitle } from "@/ui/typography";
import Link from 'next/link';
import { base } from '@/lib/airtable';
import {useRecoilState} from 'recoil'
import { destacados } from '@/lib/atom';

export function Destacados(){
   const [destac,setDestac] = useRecoilState(destacados)
   useEffect(()=>{
      base('Furniture').select({
         recordMetadata: ['commentCount']
     }).firstPage(function(err, records) {
         if (err) { console.error(err); return; }
         const data:any =[]
         records?.forEach(function(record) {
            //  console.log('Retrieved a record with', record.commentCount, 'comments');
            if(data.length < 4){
               
               data.push(record.fields)
            }
         });
         
         setDestac(data)
     });
      
   },[destac]) 

   return (
      <div>
         <Subtitle>Productos Destacados</Subtitle>
         <div style={{padding:"1rem",display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center"}}>
            {destac?.map((el:any,pos)=>{ return<Link href={"/product/"+el.Vendor[0]} key={pos}> <ThemplateDestacados id={el.Vendor[0]} price={el["Unit cost"]} title={el.Name} img={el.Images}/></Link>})}
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