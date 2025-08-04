"use client";
import { ResponsiveAppBar } from "@/components/header";
import { Footer } from "@/components/footer";
import { RecoilRoot } from "recoil";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import "./styled.css";

const muiTheme = createTheme({
  palette: {
    background: {
      paper: "#121212",
    },
    mode: "dark",
  },
});

export function MainLayout({ children }: any) {
  return (
    <RecoilRoot>
      <MuiThemeProvider theme={muiTheme}>
        <ResponsiveAppBar />
      </MuiThemeProvider>
      <div className='body_container' style={{ maxWidth: "100vw" }}>
        {children}
      </div>
      <MuiThemeProvider theme={muiTheme}>
        <Footer />
      </MuiThemeProvider>
    </RecoilRoot>
  );
}
