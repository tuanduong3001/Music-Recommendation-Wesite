import { Box, BoxProps, styled, Avatar} from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeAccessToken, removeRefreshToken } from '../../helpers/localStorage';

const Container = styled(Box)<BoxProps>(() => ({
  height: '5rem',
  width: '100%',
  display: 'flex',
  padding: '14px 0 14px 0',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
  alignItems: 'center',
 
  background: "transparent"
}));

const Title = styled(Box)<BoxProps>(()=>({
  color: '#252733',
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: '30px', 
  letterSpacing: '0.3px',
}))

const NameImageWrapper = styled(Box)<BoxProps>(()=>({
  height: '100%',
  display:"flex",
  alignItems:"center",
  position: "relative"
}))

const Name = styled(Box)<BoxProps>(()=>({
  color: '#252733',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0.2px',
  marginRight: "20px"
}))

interface Props{
  title:string,
  avatar:string,
  name:string
}
export const Header = ({title, avatar, name}:Props) => {
  const [listDown, setListDown] = useState(false)
  const navigate = useNavigate();

  return (
   <Container>
    <Title>{title}</Title>
    <NameImageWrapper onClick={()=>setListDown(!listDown)}>
      <Name >{name}</Name>
      <Box sx={{
         height: '45px',
         width: '45px',
         alignItems: 'center',
         display: 'flex',
         borderRadius: '50%',
         justifyContent: 'center',
         background: '#fff',
      }}>
      <Box
        component="img"
        sx={{
          height: 40,
          width: 40,
          objectFit: 'cover',
          borderRadius: "50%"
        }}
        alt="The house from the offer."
        src={avatar}
      />
      </Box>
      { listDown &&
                  <div className="scrollDownList"
                  style={{
                    backgroundColor: "#ccc",
                    minWidth: "192px",
                    width: "192px",
                    position: "absolute",
                    bottom: "-50px",
                    right: 0
                  }}
                  >
                    <ul>
                      <li className='listDown' style={{listStyle: "none", height: "40px", display: "flex", alignItems: "center",  justifyContent: "center"}}>
                        <Link to="/" style={{textDecoration: "none"}}
                        onClick={() => 
                         {
                          navigate("/login")
                          removeAccessToken();
                          removeRefreshToken();
                         }
                        }
                        >
                        Đăng xuất
                        </Link>
                      </li>
                    </ul>
                  </div>
                }
    </NameImageWrapper>
    
   </Container>
  );
};
