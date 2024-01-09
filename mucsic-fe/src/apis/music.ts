import axios from "axios"
import { getAccessToken } from "../helpders/localStorage"

export const LikeMusic = async (id:number) =>{
    try {
        await axios.post(process.env.REACT_APP_API_BASE_URL + "/users/update-liked", {
            musicId: id
          },{
            headers: { Authorization: 'Bearer ' + getAccessToken() }
          })
    } catch (error) {
        console.log(error)
    }
}