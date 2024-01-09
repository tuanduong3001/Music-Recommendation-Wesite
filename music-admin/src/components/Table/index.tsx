import * as React from 'react';
import { styled, Box, BoxProps,Button } from '@mui/material'
import { TableData } from './table';
const Container = styled(Box)<BoxProps>({
  marginTop: "2rem",
  background: "#fff",
  width: "100%",
  height: "580px",
  padding: "1.5rem 2rem",
  display: "flex",
  alignItems: "center",
  flexDirection: "column"

})
const NameTitle = styled(Box)<BoxProps>({
  fontWeight: "700",
  fontSize: "22px",
  lineHeight: "24px",
  letterSpacing: "0.4px",
  color: '#9FA2B4'


})
const Grid = styled(Box)<BoxProps>({
  width: "100%",
  marginTop: "20px",
  height: "calc(100% - 50px)"

  
})
interface IAppProps {
  title: string,
  data: any,
  button?: boolean,
  column: any
}
export const Table = ({ title, data, column }: IAppProps) => {

  return (
    <Container>
     <NameTitle>{title}</NameTitle>
      <Grid id = {title}>
      <TableData data={data} column={column}/>
      </Grid>
    
    </Container>
  );
}