import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../stores/hook";
import useSWR from 'swr';
import { getAccessToken } from "../helpders/localStorage";
import { useEffect } from "react";
import { setAuth, setUser } from "../reducers/auth";
import { fetcherUser } from "../helpders/fetch";

export const useAuthenticated = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useAppSelector((state: any) => state.auth.isAuth);
    const music = useAppSelector((state: any) => state.music.music);
    const {
      data: user,
      error: userError,
      mutate: reloadUser,
    } = useSWR(['/users/profile' , getAccessToken()], fetcherUser);
  
    useEffect(() => {    
      const checkUser = async () => {
        if (user) {
          dispatch(setUser(user));
          dispatch(setAuth(true));
        }
      };
      checkUser();
    }, [user, userError]);
    useEffect(()=>{
      reloadUser();
    },[location.pathname,music])
    useEffect(() => {
      if (getAccessToken() !== null && getAccessToken() && location.pathname !== '/login' && location.pathname !== '/signUp') {
        dispatch(setAuth(true));
        navigate(location.pathname);
      } else if ((location.pathname === '/login' || location.pathname === '/signUp') && getAccessToken()) {
        dispatch(setAuth(true));
        navigate('/');
      } else if ((isAuthenticated !== null && !isAuthenticated) || !getAccessToken()) {
        dispatch(setUser(null));
        dispatch(setAuth(false));
        // navigate("/login")
      }
    }, [isAuthenticated, location.pathname]);
  };