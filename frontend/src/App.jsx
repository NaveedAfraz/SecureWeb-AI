import { BrowserRouter as Router, Routes, Route } from 'react-router'
import HomePage from './pages/home'
import Navbar from './components/navbar'
function App() {
  return (
    <>
      <Router>
        <Routes>
           
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  )
}
export default App
