import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Userdashboard from "./components/Userdashboard";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "./slices/userLoginSlice";

function App() {
  let { isSuccess } = useSelector((state) => state.user);
  let dispath = useDispatch();

  const logout = () => {
    //remove token from localstorage
    localStorage.clear();
    dispath(resetState());
  };

  return (
    <>
      <Navbar className="bg-dark navbar-dark" expand="sm">
        <Container>
          <Navbar.Brand href="#home">MyApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isSuccess ? (
                <NavLink className="nav-link" to="/signin" onClick={logout}>
                  Signout
                </NavLink>
              ) : (
                <>
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                  <NavLink className="nav-link" to="/signup">
                    Signup
                  </NavLink>
                  <NavLink className="nav-link" to="/signin">
                    Signin
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />}>
          Home
        </Route>
        <Route path="/signup" element={<Signup />}>
          Register
        </Route>
        <Route path="/signin" element={<Signin />}>
          Login
        </Route>
        <Route path="/userdashboard/:username" element={<Userdashboard />}>
          Login
        </Route>
      </Routes>
    </>
  );
}

export default App;
// import React from "react";
// import "../node_modules/react-bootstrap/dist/react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Signin from "./components/Signin";
// import Signup from "./components/Signup";
// import Home from "./components/Home";
// import Userdashboard from "./components/Userdashboard";
// import "./App.css";
// import "./index.css";
// import { Navbar, Container, Nav } from "react-bootstrap";
// import { NavLink, Routes, Route } from "react-router-dom";

// function App() {
//   return (
//     <>
//       <Navbar className="bg-dark navbar-dark" expand="sm">
//         <Container>
//           <Navbar.Brand href="#home">MyApp</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               <NavLink className="nav-link" to="/">
//                 Home
//               </NavLink>
//               <NavLink className="nav-link" to="/signup">
//                 Signup
//               </NavLink>
//               <NavLink className="nav-link" to="/signin">
//                 Signin
//               </NavLink>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <Routes>
//         <Route path="/" element={<Home />}>
//           Home
//         </Route>
//         <Route path="/signup" element={<Signup />}>
//           Register
//         </Route>
//         <Route path="/signin" element={<Signin />}>
//           Login
//         </Route>
//         <Route path="/userdashboard/:username" element={<Userdashboard />}>
//           DashBoard
//         </Route>
//       </Routes>
//     </>
//   );
// }

// export default App;
