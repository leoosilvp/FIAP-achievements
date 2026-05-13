import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./routes/Home"
import Badge from "./routes/Badge"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/badge' element={<Badge />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
