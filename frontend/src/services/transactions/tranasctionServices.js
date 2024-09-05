import { useSelector } from "react-redux";
import { getUser } from "../../utils/getUser";
import { BASE_URL } from "../../utils/url";
import axios, {Axios} from 'axios'


//! add a transaction
export let addTransactionAPI = async({type, category, date, description, amount}) =>{
    //! get the token
    let token = getUser()
    let response = await axios.post(`${BASE_URL}/transaction/create`,
        {type:type, category:category, amount:amount, date:date, description:description},
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
    //! return a promise
    return response.data
}

//! list transactions
export let listTransactionAPI = async({category, type, startDate, endDate})=>{
    //! get the token
    let token = getUser()
    let response = await axios.get(`${BASE_URL}/transaction/lists`,
        {   
            params:{
                category, type, startDate, endDate
            },
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