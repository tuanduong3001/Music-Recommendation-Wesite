import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useSWR from 'swr';
import { fetcher } from '../helpers/fetcher';
import { getAccessToken } from '../helpers/localStorage';
import { setAuthenticated, setUser } from '../reducers/auth';
import { useAppDispatch, useAppSelector } from '../stores/hook';
export const useAuthenticated = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
  const isAuthenticated = useAppSelector((state:any) => state.auth.isAuthenticated);
  const {
    data:user,
    error: userError,
    mutate: reloadUser,
  } = useSWR([
    getAccessToken() ? '/users/profile' : null,getAccessToken()
  ], fetcher)

    useEffect(()=>{
    
      if(user){
              
        dispatch(setUser(user));
        dispatch(setAuthenticated(true));
      }
    },[user,userError])

    useEffect(()=>{
      reloadUser()
    },[location.pathname])
    
    useEffect(()=>{
      if(getAccessToken() !== null && getAccessToken() && location.pathname !== '/login' ){
        if(location.pathname === '/'){
          navigate("/users");
        }
        else{
          dispatch(setAuthenticated(true));
        navigate(location.pathname);
        }
      }
      else if(location.pathname === '/login' && getAccessToken()){
        dispatch(setAuthenticated(true));
        navigate("/users")
      }else if (
        ((isAuthenticated !== null && !isAuthenticated) || !getAccessToken())
      ) {
        dispatch(setAuthenticated(false));
        navigate('/login');
      }
    },[isAuthenticated, location.pathname])

}