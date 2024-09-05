export let getUser = () =>{
    let token = JSON.parse(localStorage.getItem("userInfo") || null)
    return token?.token
}
