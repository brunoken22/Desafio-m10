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
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchState, setSearchState] = useState({q:"",limit:searchParams.get("limit") || 5,offset:searchParams.get("offset") || 0});
  const [inputValue, setInputValue] = useState(searchParams.get("q") || '');
  const router = useRouter()
  const data = search( searchState) 

  useEffect(() => {
    if(props.nextCambio){
      props.next(false)
      setSearchState((prev:any)=>({
        ...prev,
        offset:Number(searchParams.get("offset")) + 5
      }))
      router.push(`/search?q=${inputValue}&limit=${searchState.limit}&offset=${Number(searchState.offset)+5}`)
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
  }, [data,props.nextCambio]);
  
  const handlerSubmit = (e: any): any => {
    e.preventDefault(); 
    const value = e.target.search.value;
    const ir = `/search?q=${value}&limit=5&offset=0`
    if(data?.results.length > 0 && Number(data?.results.length)+ data?.pagination.offset == Number(data?.pagination.total && pathname == "/search") ){
      location.reload()
    }
    router.push(ir)
    setSearchState((prev:any)=>({
      ...prev,
      offset:0,
      q:value
    }))
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


