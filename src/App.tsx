import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import ConfirmationModalContextProvider from "./Components/modalConfirmationContext";

function App() {
  return (
    <ConfirmationModalContextProvider>
      <Router basename="/blog-newsletter">
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/register" element={<Signup></Signup>} />
          <Route path="/home" element={<Home></Home>} />
        </Routes>
      </Router>
    </ConfirmationModalContextProvider>
  );
}

export default App;
