import {BrowserRouter, Route, Routes} from "react-router-dom"
import HeroSection from "./components/Home/HomePage"
import PublicNavbar from "./components/Navbar/PublicNavbar"
import LoginForm from "./components/Users/Login"
import RegistrationForm from "./components/Users/Register"
import { getUser } from "./utils/getUser"
import PrivateNavbar from "./components/Navbar/PrivateNavbar"
import { useSelector } from "react-redux"
import AddCategory from "./components/Category/AddCategory"
import CategoriesList from "./components/Category/CategoryList"
import UpdateCategory from "./components/Category/updateCategory"
import TransactionForm from "./components/Transaction/TranactionForm"
import Dashboard from "./components/Users/Dashboard"
import UserProfile from "./components/Users/UserProfile"
import AuthRoute from "./components/Auth/AuthRoute"

function App() {
  //* get the token
  let token = getUser()
  let user = useSelector((state)=>state?.auth?.user)
  // console.log(user.token);
  // console.log(token);
  return (
    <BrowserRouter>
    {/* navbar */}    
    {user ? <PrivateNavbar/> : <PublicNavbar/>}
    <Routes>
      <Route path="/" element={<HeroSection/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/register" element={<RegistrationForm/>}/>
      <Route path="/add-category" element={<AuthRoute>
        <AddCategory/>
      </AuthRoute>}/>
      <Route path="/categories" element={<AuthRoute>
        <CategoriesList/>
      </AuthRoute>}/>
      <Route path="/update-category/:id" element={<AuthRoute>
        <UpdateCategory/>
      </AuthRoute>}/>
      <Route path="/add-transaction" element={<AuthRoute>
        <TransactionForm/>
      </AuthRoute>}/>
      <Route path="/dashboard" element={<AuthRoute>
        <Dashboard/>
      </AuthRoute>}/>
      <Route path="/profile" element={<AuthRoute>
        <UserProfile/>
      </AuthRoute>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
