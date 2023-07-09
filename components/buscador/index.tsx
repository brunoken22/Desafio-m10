"use client"
import styled from 'styled-components'
import { Title } from '@/ui/typography'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';

const Div = styled.div`
   text-align: center;
   display: flex;
   flex-direction: column;
   gap: 1rem;

`
export function Buscador(){

   return (
      <Div> 
        <Title $bg="#000">El mejor <br></br>e-commerce</Title>
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',maxWidth:"100%",minWidth:"50%" ,margin:"auto"}}>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscador" inputProps={{ 'aria-label': 'Buscador' }} required/>
          <Link href={"/product"}>
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" >
              <SearchIcon />
            </IconButton>
          </Link>
        </Paper>
      </Div>
   )
}



