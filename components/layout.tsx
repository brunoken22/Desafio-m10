"use client" 
import {ResponsiveAppBar} from "@/components/header"
import {Footer} from '@/components/footer'
import styled from 'styled-components'
import {RecoilRoot} from 'recoil';
import { ThemeProvider as MuiThemeProvider , createTheme  } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { useServerInsertedHTML } from 'next/navigation'
import { useState } from "react";

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
   row-gap: 5rem;
`

export function MainLayout({children}:any){
   const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())
 
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })
 
   return(
         
      <RecoilRoot >
         <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
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
         </StyleSheetManager>
      </RecoilRoot>
   )
}