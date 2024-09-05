import { getUser } from "../../utils/getUser";
import { BASE_URL } from "../../utils/url";
import axios, {Axios} from 'axios'
// create a function which will return a promise

//! login
export let loginAPI = async(userData)=>{
    let response = await axios.post(`${BASE_URL}/users/login`,
        {email:userData.email, password:userData.password}
    )
    //! return a promise
    return response.data
}

//! register
export let registerAPI = async(userData)=>{
    let response = await axios.post(`${BASE_URL}/users/register`,
        {email:userData.email, password:userData.password, username:userData.username}
    )
    //! return a promise
    return response.data
}

//! update user profile
export let updateProfileAPI = async(userData)=>{
    //! get the token
    let token = getUser()
    let response = await axios.put(`${BASE_URL}/users/update-profile`,
        {newEmail:userData.email, newUsername:userData.username},
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
    //! return a response
    return response.data
}

//! change password
export let changePasswordAPI = async(userData)=>{
    //! get the token
    let token = getUser()
    let response = await axios.put(`${BASE_URL}/users/update-password`,
        {newPassword:userData.password},
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
    //! return a response
    return response.data
}