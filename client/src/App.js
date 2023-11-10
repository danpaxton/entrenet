import { useState } from 'react';
import './App.css';
import Navbar from './navbar/Navbar';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

import Home from './pages/Home'
import About from './pages/About'
import Resources from './pages/Resources'
import Blogs from './pages/Blogs'
import Forums from './pages/Forums'
import Contact from './pages/Contact'
import Profile from './profilePages/Profile'
import Settings from './profilePages/Settings'
import Login from './profilePages/Login'

function App() {
  const [login, setLogin] = useState({ first: "", last: "", username: "", token: "" })

  return (
    <Router>
      <Navbar login={login} setLogin={setLogin} />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/forums' element={<Forums />} />
          <Route path='/contact' element={<Contact login={login} setLogin={setLogin} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/login' element={ <Login login={login} setLogin={setLogin} />}/>
      </Routes>
  </Router>
  )
}
export default App;
