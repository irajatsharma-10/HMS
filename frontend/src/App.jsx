import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Components/Home'
import NavBar from './Components/NavBar'
import Admin from './Components/pages/admins/Admin'
import Staff from './Components/pages/staffs/Staff'
import Login from './Components/Login'
import { Provider } from "react-redux";
import store from "./utils/store/store"
import StudentDashboard from './Components/pages/Student/StudentDashBoard'

function App() {
  return (
    <>
      <Provider store={store}> 
        <BrowserRouter basename="/">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
