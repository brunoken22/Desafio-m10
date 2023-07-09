"use client" 
import {ResponsiveAppBar} from "@/components/header"
import {Footer} from '@/components/footer'
import styled from 'styled-components'
import {RecoilRoot} from 'recoil';
import { ThemeProvider as MuiThemeProvider , createTheme  } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const StyledTheme = {
   bg: "#000",
   color:"#fff"
 };
 
 const muiTheme = createTheme({
   palette: {
     mode: 'dark',
   },
 });

const Div = styled.div`
   padding: 1.5rem;
   display: grid;
   grid-template-rows: auto 1fr;
   row-gap: 5rem;
`

export function MainLayout({children}:any){
   return(
      <RecoilRoot >
         <MuiThemeProvider theme={muiTheme}>
            <StyledThemeProvider theme={StyledTheme}>
               <ResponsiveAppBar/>
                  <Div>
                     {children}
                  </Div>
               <Footer/>
            </StyledThemeProvider>
         </MuiThemeProvider> 
      </RecoilRoot>
   )
}