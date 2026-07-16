
import Header from "./components/Header"
import {Routes,Route} from 'react-router-dom'
import Home from "./Pages/Home"

import SignUp from "./Pages/SignUp"
import Login from "./Pages/Login"
import Chat from "./Pages/Chat"
import NotFound from "./Pages/NotFound"
import { useAuth } from "./AuthContext/AuthContext"
const App = () => {
  console.log(useAuth()?.isLoggedIn)
  return (
    <main>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/chat' element={<Chat/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </main>
  )
}

export default App