import { BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom"

import StartPage from "./pages/StartPage"
import SignUp from "./pages/Users/SignUp"
import SignIn from "./pages/Users/SignIn";
import MainPage from "./pages/MainPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/mainPage" element={<MainPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
