import { axiosInstance } from './index';

export const CreateNewUser = async(name:string, email:string, password:string, dateOfBirth: string, gender:number)=>{
   return  await axiosInstance.post("/users", {
        name,email,password, dateOfBirth, gender
    })
 
}

export const EditExisUser = async(id:number, name:string, email:string, dateOfBirth: string, gender:number)=>{
    return await axiosInstance.put("admin/users/update-user", {
        userId: id,  name,email,dateOfBirth,gender
    })

}

export const ResetPassword = async(email:string)=>{
    return await axiosInstance.put("admin/users/reset-password", {
       email
    })
}