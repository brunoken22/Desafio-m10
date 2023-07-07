import styled from 'styled-components'
import { Title } from '@/ui/typography'
import { Input } from '@/ui/input' 
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
const Div = styled.div`
   text-align: center;
   display: flex;
   flex-direction: column;
   gap: 1rem;

`
const DivButton = styled(Div)`
  width: 150px;
  margin: 0;
`
export function Buscador(){

   return (
      <Div> 
        <Title bg="#000">El mejor <br></br>e-commerce</Title>
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 ,margin:"auto"}}>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscador" inputProps={{ 'aria-label': 'Buscador' }} />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Div>
   )
}



