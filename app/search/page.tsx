"use client"
import { Buscador } from '@/components/buscador';
import { useEffect,useState,useRef } from 'react';
import { ThemplateDestacados } from '@/components/destacados';
import Link from 'next/link';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Loader } from '@/ui/loader';

export default function Search({params}:any){
   const [nextCambio,setNextCambio] = useState(false)
   const [data,setData] = useState({results:[],pagination:{total:0,offset:0,limit:0}})
   const btn:any = useRef()
   useEffect(()=>{
      if(btn.current){
         if( (data?.results.length )+ data?.pagination.offset == (data?.pagination.total)){
            btn.current.style.display = 'none'
         }else{
            btn.current.style.display = 'flex'
         }
      }
   },[data])

   const handleSearchAll = (data:any)=>{
      setData(data)
   }

   const handleClick =(e:any)=>{
      setNextCambio(true)
   }

   const next = (data:boolean)=>{
      setNextCambio(data)
   }
   
   return(
      <div>
         <Buscador cambiaremos={handleSearchAll} nextCambio={nextCambio} next={next}></Buscador>
         <div style={{padding:"1.5rem",display:"flex",gap:"1.5rem",flexDirection:"column"}}>
            <p style={{textAlign:"center"}}>Resultados {data?.pagination.limit ? data?.results.length + data?.pagination.offset:null} de {data?.pagination.total ? data?.pagination.total:null}</p>
            <div style={{padding:"1rem",display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center"}}>
               {data?.results.length > 0? data.results.map((el:any,pos:any)=>{ return<Link href={"/product/"+el.objectID} key={pos} style={{textDecoration:"none"}}> <ThemplateDestacados id={el.objectID} price={el["Unit cost"]} title={el.Name} img={el.Images}/></Link>}):"No se encontraron resultados"}
            </div>
         </div>
         <div style={{justifyContent: "center"}} ref={btn}>
            <Button style={{display:"flex"}} size="large"  color="success" onClick={handleClick} >Ver más <NavigateNextIcon/></Button>
         </div>
      </div> 
   )
}