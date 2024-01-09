import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../stores/hook";
import useSWR from 'swr';
import { getAccessToken } from "../helpders/localStorage";
import { useEffect } from "react";
import { setAuth, setUser } from "../reducers/auth";
import { fetcherUser } from "../helpders/fetch";
import { setAllMusic } from "../reducers/music";
import axios from "axios";

export const useMusic = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
   
    const getData = async () => {
        const music = await axios.get(process.env.REACT_APP_API_BASE_URL + "/musics?page=1&limit=1000")
        dispatch(setAllMusic(music.data.data))

    }
    useEffect(() => {    
        getData()
    }, []);


  };