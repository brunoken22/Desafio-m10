'use client';
import {ResponsiveAppBar} from '@/components/header';
import {Footer} from '@/components/footer';
import {ThemeProvider} from 'styled-components';
import {RecoilRoot} from 'recoil';
import {createTheme} from '@mui/material/styles';
import {ThemeProvider as MuiThemeProvider} from '@mui/material/styles';
import {Div} from './styled';
import {StyledComponentsRegistry} from './registry';
const StyledTheme = {
  bg: '#121212',
  color: '#fff',
};

const muiTheme = createTheme({
  palette: {
    background: {
      paper: '#121212',
    },
    mode: 'dark',
  },
});

export function MainLayout({children}: any) {
  return (
    <StyledComponentsRegistry>
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
    </StyledComponentsRegistry>
  );
}
