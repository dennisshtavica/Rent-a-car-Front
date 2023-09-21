import { BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom"

import StartPage from "./pages/StartPage"
import SignUp from "./pages/Users/SignUp"
import SignIn from "./pages/Users/SignIn";
import MainPage from "./pages/MainPage";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";
import SearchResults from "./pages/SearchResults";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/mainPage" element={<MainPage/>}/>
        <Route path="/bookingPage/:id" element={<BookingPage/>}/>
        <Route path="/contactPage" element={<ContactPage/>}/>
        <Route
          path="/search-results/:carBrand/:carModel"
          element={<SearchResults/>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
