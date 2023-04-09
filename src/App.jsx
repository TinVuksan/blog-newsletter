import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Components/Authentication/Login';
import Signup from './Components/Authentication/Signup';
//import PhoneVerify from './Components/Authentication/PhoneVerify';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = '/' element = {<Login></Login>} />
        <Route path = '/register' element = {<Signup></Signup>} />
        <Route path = '/home' element = {<Home></Home>} />
        {/* <Route path = '/phone/verify' element = {<PhoneVerify></PhoneVerify>} /> */}
      </Routes>
    </Router>
    
  );
}

export default App;
