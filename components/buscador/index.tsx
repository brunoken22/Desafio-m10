"use client";
import styled from 'styled-components'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect,useState } from 'react';
import { search } from '@/lib/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const Div = styled.div`
   text-align: center;
   display: flex;
   flex-direction: column;
   gap: 1rem;
`


export  function Buscador(props:any){
  
  const searchParams = usePathname()
  const searchPath = useSearchParams()
  const router = useRouter()
  const [aBuscar, setABuscar] = useState('');
  const data = search("/api/search?q=" +aBuscar) 

  const handlerSubmit = (e: any): any => {
    e.preventDefault(); 
    const value = e.target.search.value;
    if(searchParams == "/"){
      router.push("/search?q="+value)
    }else{
      setABuscar(value);
    }
    
  };

  useEffect(() => {
    if (data) {
      props.cambiaremos(data);
      return
    }
    if(searchParams !== "/" && searchPath.get("q")){
      setABuscar(searchPath.get("q") as string)
    }
  }, [aBuscar,data]);



  return (
      <Div > 
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',maxWidth:"100%",minWidth:"50%" ,margin:"auto"}} onSubmit={handlerSubmit}>
          <InputBase name='search' sx={{ ml: 1, flex: 1 }} placeholder="Buscador" inputProps={{ 'aria-label': 'Buscador' }}  required/>
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" >
              <SearchIcon />
            </IconButton>
        </Paper>
      </Div>
   )
}



