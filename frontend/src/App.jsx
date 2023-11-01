import { useState } from 'react'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './utils/PrivateRoute'
import LoginPage from './pages/LoginPage'
import './App.css'
import Header from './components/Header'
function App() {
  return(
    <div className="App">
      <Router>
      <AuthProvider>
        <Header></Header>
        <Routes>
        
        <Route element={<PrivateRoute><HomePage/></PrivateRoute>} path='/' exact/>
        <Route element={<LoginPage/>} path='/login' />
        
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
