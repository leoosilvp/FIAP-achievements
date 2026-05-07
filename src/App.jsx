import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./routes/Home"
import Badge from "./routes/Badge"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/badge' element={<Badge />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
