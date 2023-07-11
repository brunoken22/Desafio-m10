"use client"
import { Buscador } from '@/components/buscador';
import { useEffect,useState } from 'react';
import { ThemplateDestacados } from '@/components/destacados';
import Link from 'next/link';


export default function Search({params}:any){

   const [data,setData] = useState()
   const handleSearchAll = (data:any)=>{
      setData(data)
   }

   return(
      <div>
         <Buscador cambiaremos={handleSearchAll} ></Buscador>
         <div style={{padding:"1rem",display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center"}}>
            {(data as any)?.results.length > 0? (data as any).results.map((el:any,pos:any)=>{ return<Link href={"/product/"+el.objectID} key={pos}> <ThemplateDestacados id={el.objectID} price={el["Unit cost"]} title={el.Name} img={el.Images}/></Link>}):"No se encontraron resultados"}
         </div>
      </div>
   )
}