import { axiosInstance } from "."

export const CreateNewCategory = async(name:string)=>{
    return  await axiosInstance.post("/admin/categories", {
         name
     })
  
 }
 
 export const EditExisCategory = async(id:string, name:string)=>{
     return await axiosInstance.post("/categories/edit", {
         id, name
     })
 
 }