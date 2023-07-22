"use client"
import { useEffect } from 'react';
import { ResponsiveAppBar } from '@/components/header';
import { Footer } from '@/components/footer';
import styled, { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const StyledTheme = {
  bg: "#121212",
  color: "#fff"
};

const muiTheme = createTheme({
  palette: {
    background: {
      paper: "#121212"
    },
    mode: "dark"
  },
});

const Div = styled.div`
  padding: 1.5rem;
  display: grid;
  row-gap: 5rem;
`;

export function MainLayout({ children }: any) {
  useEffect(() => {
    // Remove server-side inserted styles on the client-side
    const styleTags = document.querySelectorAll('style[data-styled-components]');
    styleTags.forEach((styleTag) => {
      if (styleTag.getAttribute('data-styled-components')) {
        styleTag.remove();
      }
    });
  }, []);

  return (
    <RecoilRoot>
      <ThemeProvider theme={StyledTheme}>
        <MuiThemeProvider theme={muiTheme}>
          <ResponsiveAppBar />
        </MuiThemeProvider>
        <Div>{children}</Div>
        <MuiThemeProvider theme={muiTheme}>
          <Footer />
        </MuiThemeProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}
