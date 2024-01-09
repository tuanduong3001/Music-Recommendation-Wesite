import styled from "@emotion/styled";
import { Box, BoxProps } from "@mui/system";

export const Topbar = styled(Box)<BoxProps>(() => ({
    height: "64px",
    width:"100%",
    minHeight: 0,
    top: 0,
    zIndex: 55,
    position: "sticky",
  }));
  export const TopBarWrap = styled(Box)<BoxProps>(() => ({
    display: "flex",
    height: "64px",
    alignItems:"center",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 10,
    position: "relative",
    padding: "16px 32px"
  }));
  export const BackgroundTopBar  = styled(Box)<BoxProps>(() => ({
   backgroundColor: "#121212",
   bottom: 0,
   left: 0,
   overflow:"hidden",
   position: "absolute",
   right: 0,
   top: 0,
   transition: 'background-color .25s',
   zIndex: -1 
  }));
  export const Background = styled(Box)<BoxProps>(() => ({
    backgroundColor: 'rgba(0,0,0,.6)',
    height: "100%"
  }));
  export const TopBarBtnArrow = styled(Box)<BoxProps>(() => ({
    display:"flex",
    gap: "16px"
  }));
  export const BtnArrow = styled(Box)<BoxProps>(() => ({
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.7)",
    border: "none",
    borderRadius:"50%",
    color: "#fff",
    cursor: "pointer",
    zIndex: "5",
    height: "32px",
    justifyContent: "center",
    position: "relative",
    width: "32px",
  }));
  export const TopBarBtnAuth = styled(Box)<BoxProps>(() => ({
    padding: "0"
  }));
  export const BtnAuth = styled(Box)<BoxProps>(() => ({
    fontSize: "1rem",
    fontWeight: 700,
    backgroundColor: "transparent",
    border: "0px",
    borderRadius: "500px",
    cursor: "pointer",
    position: "relative",
    padding: "12px 15px 12px 5px",
    textAlign: "center",
    transitionDuration: "33ms",
    transitionProperty: 'background-color, border-color, color, box-shadow, filter, transform',
    color: "#a7a7a7",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minBlockSize: "48px",
  }));
  export const BtnLogin = styled(Box)<BoxProps>(() => ({
    backgroundColor: "#fff",
    color: "#000",
    width: "100%",
    height: "100%",
    paddingInline: "32px",
    minBlockSize: "48px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "500px"
  }));