import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./routes/Home"
import Catalog from "./routes/Catalog"
import Badges from "./routes/Badges"
import Error from "./routes/Error"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Error />} />
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/badge' element={<Badges />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
