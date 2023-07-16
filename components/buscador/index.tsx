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
function urlNext(params:any){
  const url = `/search?q=${params.q}&limit=${params.limit?params.limit:5}&offset=${params.offset?Number(params.offset)+5:0}`
  return url
}

export  function Buscador(props:any){
  const searchParams = useSearchParams()
  // const [aBuscar, setABuscar] = useState('');
  const [searchState, setSearchState] = useState({q:"",limit:"5",offset:"0"});
  const [inputValue, setInputValue] = useState(searchParams.get("q") || '');
  const router = useRouter()
  const data = search( searchState) 

  useEffect(() => {

    if(props.nextCambio){
      setSearchState((prev:any)=>({
        ...prev,
        offset:Number(searchParams.get("offset"))
      }))
      // setTimeout(()=>{
        props.next(false)
        router.push(`/search?q=${inputValue}&limit=${searchState.limit}&offset=${Number(searchState.offset)+5}`)
        console.log(searchState)
      // },1000)
    }

    if(inputValue){
      setSearchState((prev)=>({
        ...prev,
        q:inputValue
      }))
    }
    if (data?.results) {
      props.cambiaremos(data);
    }
  }, [data,props.nextCambio,inputValue]);
  
  const handlerSubmit = (e: any): any => {
    e.preventDefault(); 
    const value = e.target.search.value;
    const ir = `/search?q=${value}&limit=5&offset=0`
    router.push(ir)
    setSearchState((prev:any)=>({
      ...prev,
      q:value
    }))
    // const ir = `/search?q=${value}&limit=${searchParams.get("limit")?searchParams.get("limit"):5}&offset=${searchParams.get("offset")?searchParams.get("offset"):0}`
  };

  return (
      <Div > 
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',maxWidth:"100%",minWidth:"50%" ,margin:"auto"}} onSubmit={handlerSubmit}>
          <InputBase name='search' sx={{ ml: 1, flex: 1 }} placeholder="Buscador" value={inputValue} onChange={(e:any)=>setInputValue(e.target.value)}  inputProps={{ 'aria-label': 'Buscador' }}  required/>
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" >
              <SearchIcon />
            </IconButton>
        </Paper>
      </Div>
   )
}


