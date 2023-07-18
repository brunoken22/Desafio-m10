"use client" 
import {ResponsiveAppBar} from "@/components/header"
import {Footer} from '@/components/footer'
import styled from 'styled-components'
import {RecoilRoot} from 'recoil';
import { ThemeProvider as MuiThemeProvider , createTheme  } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const StyledTheme = {
   bg: "#121212",
   color:"#fff"
 };
 
 const muiTheme = createTheme({
   
   palette: {
      background:{
         paper:"#121212"
      },
      mode:"dark"
    },
 });

const Div = styled.div`
   padding: 1.5rem;
   display: grid;
   grid-template-rows: auto 1fr;
   row-gap: 5rem;
   justify-content: center;
`

export function MainLayout({children}:any){
   return(
      <RecoilRoot >
         <StyledThemeProvider theme={StyledTheme}>
            <MuiThemeProvider theme={muiTheme}>
               <ResponsiveAppBar/>
            </MuiThemeProvider> 
                  <Div>
                     {children}
                  </Div>
            <MuiThemeProvider theme={muiTheme}>      
               <Footer/>
            </MuiThemeProvider> 
         </StyledThemeProvider>
      </RecoilRoot>
   )
}