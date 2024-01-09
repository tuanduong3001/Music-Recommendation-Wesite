import styled from "@emotion/styled";
import { Box, BoxProps } from "@mui/system";

export const NavBar = styled(Box)<BoxProps>(() => ({
    backgroundColor: '#000',
    display: "flex",
    flexDirection:"column",
    minHeight: 0,
    height:"100%",
    position: "fixed",
    top: 0,
    left: 0,
    width: "280px",
    zIndex:4
  }));

  export const NavBarWrap = styled(Box)<BoxProps>(() => ({
    display: "flex",
    flex: 1,
    paddingTop: "24px",
    flexDirection:"column",
    width: "100%",
    userSelect: "none",
    minHeight: 0,
  }));

  export const BannerWrap = styled(Box)<BoxProps>(() => ({
    display: "flex",
   flexDirection: "row",
   justifyContent: "space-between",
   flexShrink: 0
  }));

  export const ListWrap = styled(Box)<BoxProps>(() => ({
    listStyle: "none",
    marginTop: "10px"
  }));
  export const ListItemWrap = styled(Box)<BoxProps>(() => ({
    margin: "10px 0",
    padding: "0 8px",

  }));
  export const TitleItem = styled(Box)<BoxProps>(() => ({
    fontSize: '1rem',
    fontWeight: 700,
    color: "inherit",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }));

