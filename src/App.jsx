import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"
import DashboardLayout from './pages/Dashboard/pages/DashboardLayout';

import StartPage from "./pages/StartPage"
import SignUp from "./pages/Users/SignUp"
import SignIn from "./pages/Users/SignIn";
import MainPage from "./pages/MainPage";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";
import SearchResults from "./pages/SearchResults";
import CarRented from "./pages/CarRented";
import DetyraLab from "./pages/DetyraLab";
import ProfilePage from "./pages/ProfilePage";
import Error404 from "./pages/Error404";
import MainDashboard from "./pages/Dashboard/pages/MainDashboard";
import Rentals from './pages/Dashboard/pages/Rentals';
import Vehicles from './pages/Dashboard/pages/Vehicles';
import Customers from './pages/Dashboard/pages/Customers';
import Staff from './pages/Dashboard/pages/Staff';
import Settings from './pages/Dashboard/pages/Settings';
import Reports from './pages/Dashboard/pages/Reports';
import Maintenance from './pages/Dashboard/pages/Maintenance';
import Reservations from './pages/Dashboard/pages/Reservations';
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import ProtectedPaymentRoute from './components/ProtectedPaymentRoute';


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
        <Route path="/detyralab2" element={<DetyraLab/>}/>
        {/* <Route path="/cancel" element={<Cancel/>}/>
        <Route path="/success" element={<Success/>}/> */}
        <Route path='/cancel' element={<ProtectedPaymentRoute><Cancel/></ProtectedPaymentRoute>}/>
        <Route path='/success' element={<ProtectedPaymentRoute><Success/></ProtectedPaymentRoute>}/>


        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<MainDashboard />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="reports" element={<Reports />} />
          <Route path="staff" element={<Staff />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        <Route
          path="/search-results/:carBrand/:carModel"
          element={<SearchResults/>}
        />
        <Route path="/carsRented" element={<CarRented/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>

        <Route path="*" element={<Error404 />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
