import { useState } from 'react';
import './App.css';
import Navbar from './navbar/Navbar';
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';

import Home from './pages/Home'
import About from './pages/About'
import Resources from './pages/Resources'
import Forums from './pages/Forums'
import Contact from './pages/Contact';
import Profile from './profile/Profile';
import Settings from './profile/Settings';
import Login from './profile/Login';
import axios from 'axios';

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

export const api = axios.create({ baseURL: "http://localhost:5000/", withCredentials: true});

function App() {
  const [tabValue, setTabValue] = useState('');
  const [cookies, removeCookie] = useCookies([]);
  const [resources, setResources] = useState([]);
  const [login, setLogin] = useState(
    { 
      admin: false, 
      logged: false,
      first: "", 
      last: "", 
      email:"", 
     });

  const formatDate = date => {
      const d = new Date(date);
      return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear().toString().slice(2, 4)
  };
  
  const sortDate = (a, b) => {
      const d1 = new Date(a.date)
      const d2 = new Date(b.date)
      if (d1 < d2) {
          return 1;
      }
      if (d1 > d2) {
          return -1;
      }
      return 0
  };

  return (
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar cookies={cookies} removeCookie={removeCookie} tabValue={tabValue} setTabValue={setTabValue} login={login} setLogin={setLogin} />
          <Routes>
            <Route exact path='/' element={<Home formatDate={formatDate} resource={resources.sort(sortDate)[0]} setTabValue={setTabValue} />} />
            <Route path='/about' element={<About />} />
            <Route path='/resources' element={<Resources sortDate={sortDate} formatDate={formatDate} resources={resources} setResources={setResources} login={login} />} />
            <Route path='/forums' element={<Forums />} />
            <Route path='/contact' element={<Contact login={login} />} />
            <Route path='/profile' element={<Profile login={login} />} />
            <Route path='/settings' element={<Settings  />} />
            <Route path='/login' element={<Login login={login} setLogin={setLogin} />} />
          </Routes>
        </Router>
      </ThemeProvider>
  )
}
export default App;
