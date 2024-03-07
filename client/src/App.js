import { useState } from 'react';
import './App.css';
import Navbar from './navbar/Navbar';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';

import Home from './pages/Home'
import About from './pages/About'
import Resources from './pages/Resources'
import Forums from './pages/Forums'
import Contact from './pages/Contact';
import Profile from './profilePages/Profile';
import Settings from './profilePages/Settings';
import Login from './profilePages/Login';
import axios from 'axios'

import { createTheme, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#ffffff',
    },
  },
})

export const api = axios.create({ baseURL: "http://localhost:5000/"});

function App() {
  const [login, setLogin] = useState({ first: "", last: "", username: "", token: "" });
  const [tabValue, setTabValue] = useState('/');
  const [admin, setAdmin] = useState(true);

  return (
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar tabValue={tabValue} setTabValue={setTabValue} login={login} setLogin={setLogin} />
          <Routes>
            <Route exact path='/' element={<Home setTabValue={setTabValue} />} />
            <Route path='/about' element={<About />} />
            <Route path='/resources' element={<Resources login={login} admin={admin} />} />
            <Route path='/forums' element={<Forums />} />
            <Route path='/contact' element={<Contact login={login} />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/login' element={<Login login={login} setLogin={setLogin} />} />
          </Routes>
        </Router>
      </ThemeProvider>
  )
}
export default App;
