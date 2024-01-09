import { axiosInstance } from "../../apis"


export const deleteUser = async (id:number) => {
    await axiosInstance.delete(`/admin/users/delete-user/${id}`)
}

export const deleteMusic = async (id:number) => {
    await axiosInstance.delete(`/musics/delete/${id}`)
}

export const deleteArtist = async (id:number) => {
    await axiosInstance.delete(`/artists/${id}`)
}
export const deleteCategory = async (id:number) => {
    await axiosInstance.delete(`/admin/categories/delete-category/${id}`)
}