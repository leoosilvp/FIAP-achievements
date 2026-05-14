import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./routes/Home"
import Badge from "./routes/Badge"
import Catalog from "./routes/Catalog"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/badge' element={<Badge />} />
        <Route path='/catalog' element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
