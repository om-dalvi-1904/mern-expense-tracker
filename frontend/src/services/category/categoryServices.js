import { useSelector } from "react-redux";
import { getUser } from "../../utils/getUser";
import { BASE_URL } from "../../utils/url";
import axios, {Axios} from 'axios'


//! create a category
export let addCategoryAPI = async(userData) =>{
    //! get the token
    let token = getUser()
    let response = await axios.post(`${BASE_URL}/category/add`,
        {name:userData.name, type:userData.type},
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
    //! return a promise
    return response.data
}

//! view categories
export let listCategoryAPI = async()=>{
    //! get the token
    let token = getUser()
    let response = await axios.get(`${BASE_URL}/category/lists`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
    //! return a promise
    return response.data
}

//! update a category
export let updateCategoryAPI = async({name, type, id}) =>{
    //! get the token
    let token = getUser()
    let response = await axios.put(`${BASE_URL}/category/update/${id}`,
        {newName:name, newType:type},
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
    //! return a promise
    return response.data
}

//! delete a categrory
export let deleteCategoryAPI = async(id)=>{
    //! get the token
    let token = getUser()
    let response = await axios.delete(`${BASE_URL}/category/delete/${id}`,
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data
}