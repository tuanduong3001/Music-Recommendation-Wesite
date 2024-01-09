import { axiosInstance } from "."


export const CreateNewArtist = async(name:string, image:string, title:string)=>{
    return  await axiosInstance.post("/artists", {
         name, image, title
     })
  
 }