// import {Routes, Route} from 'react-router-dom';
// import Layout from './components/layout';
// import About from './components/About';
// import Home from './components/Home';
// import Projects from './components/Projects';
// import Education from './components/Education';
// import Services from './components/Services';
// import Contact from './components/Contact';
// import Login from './components/Login';
// import Register from './components/Register';
// import Messages from './components/Messages';
// import Dashboard from './components/Dashboard';
// import ManageUsers from './components/ManageUsers';

import {Routes, Route} from 'react-router-dom';
import NavBar from '../components/NavBar';
import About from '../pages/About';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import Education from '../pages/Education';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Messages from '../pages/Messages';
import Dashboard from '../pages/Dashboard';
import ManageUsers from '../pages/ManageUsers';
import ManageContacts from '../pages/ManageContacts';


//Main router which controls the routing of the application using the url path
//Each route is assigned to a jsx component which is rendered when the route is accessed
const MainRouter = () => {
    return (
        <>
      <NavBar />
        
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/education' element={<Education />} />  
            <Route path='/projects' element={<Projects />} />  
            <Route path='/services' element={<Services />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/users' element={<ManageUsers />} />
            <Route path='/admin/projects' element={<Projects />} />
            <Route path='/admin/contacts' element={<ManageContacts />} />
        </Routes>
        </>
    )
}

export default MainRouter;