import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router'
import { Home } from './Pages/home'
import { Register } from './Pages/Register'
import { Login } from './Pages/Login'
import { LeaderboardPage } from './Pages/LeaderboardPage'
import ProtectedRoute from './Components/ProtectedRoute'
import { Navbar } from './Components/Navbar'
import SurvivalPage from './Pages/SurvivalPage'
import AimTrainer from './Pages/AimTrainer'


function App() {

  return (
    <Router>
      <div className="App"></div>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path='/game' element={<AimTrainer/>}/>
            <Route path='/LeaderboardPage' element={<LeaderboardPage/>}/>
            <Route path='/SurvivalPage' element={<SurvivalPage/>}/>
          </Route>
      </Routes>
    </Router>
  )
}

export default App
