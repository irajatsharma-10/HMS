import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Components/Home'
import NavBar from './Components/NavBar'
import Admin from './Components/pages/Admin'
import Staff from './Components/pages/Staff'
import Student from './Components/pages/Student/Student'
import Login from './Components/pages/Login'

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/student" element={<Student/>} />
          <Route path="/staff" element={<Staff/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
