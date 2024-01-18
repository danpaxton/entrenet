import { useState, useEffect } from 'react';
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
import Editor from './editor/Editor';


function App() {
  const Resource = (title, desc) => ({ title, desc, data: {} });
  const Blog = (title, author, img) => ({ title, author, img, data: {} });

  const [editor, setEditor] = useState(Editor());
  const [viewEditor, setViewEditor] = useState(false);
  const [login, setLogin] = useState({ first: "", last: "", username: "", token: "" });
  const [resources, setResources] = useState([Resource('first source', 'initial desc')]);
  const [blogs, setBlogs] = useState([]);


  useEffect(() => {
      // Get resource pages from backend.

  }, [login, resources, blogs])

  return (
    <Router>
      <Navbar login={login} setLogin={setLogin} />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/resources' element={<Resources editor={editor} setEditor={setEditor} viewEditor={viewEditor} setViewEditor={setViewEditor} resources={resources} setResources={setResources} />} />
          <Route path='/forums' element={<Forums />} />
          <Route path='/contact' element={<Contact login={login} setLogin={setLogin} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/login' element={ <Login login={login} setLogin={setLogin} />} />
      </Routes>
  </Router>
  )
}
export default App;
