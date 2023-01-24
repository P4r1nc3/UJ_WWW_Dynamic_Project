import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import InStockProducts from "./pages/InStockProducts";
import CreateProducts from "./pages/CreateProducts";
import Products from "./pages/Products";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RemovedProducts from "./pages/RemovedProducts";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import {ValidContext} from "./functions/ValidContext";
import React, {useEffect, useState} from "react";
import axios from "axios";
import EditProducts from "./pages/EditProducts";
import {Container, Nav, Navbar, Button} from "react-bootstrap";


function App() {

    const [validState, setValidState] = useState({
        username: "",
        id: 0,
        status: false
    });

    const [isNavExpanded, setIsNavExpanded] = useState(false)

    // Sprawdzenie czy zalogowana osoba jest autoryzowana
    useEffect(() => {
        axios.get("http://localhost:8080/validation/valid", {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            if (response.data.error) {
                setValidState({...validState, status: false});
            } else {
                setValidState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true
                });
            }
        });
    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        setValidState({
            username: "",
            id: 0,
            status: false
        });
        setIsNavExpanded(false);
    }

    return (
        <Router>
            {!validState.status ? (
                <>
                    <nav className="navigation">
                        <a href="/main" className="logo">
                            <span>FREE</span>DGE
                        </a>
                        <button
                            className="hamburger"
                            onClick={() => {
                            setIsNavExpanded(!isNavExpanded)
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="white"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <div
                            className={
                            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                            }
                        >
                            <ul>
                                <li>
                                    <a href="/login">Login</a>
                                </li>
                                <li>
                                    <a href="/register">Register</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </>
            ) : (
                <>
                    <nav className="navigation">
                    <a href="/main" className="logo">
                            <span>FREE</span>DGE
                        </a>
                        <button
                            className="hamburger"
                            onClick={() => {
                            setIsNavExpanded(!isNavExpanded)
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="white"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <div className={
                            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                        }>
                            <ul>
                                <li>
                                    <Nav.Link onClick={() => setIsNavExpanded(false)} as={Link} to="/">Na stanie</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link onClick={() => setIsNavExpanded(false)} as={Link} to="/create">Dodaj produkt</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link onClick={() => setIsNavExpanded(false)} as={Link}
                                          to={`/removed/${validState.id}`}>Usunięte produkty</Nav.Link>
                                </li>
                                <li>
                                    <Button variant="secondary" className="logout"onClick={logout}>Wyloguj</Button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </>
            )}
            <div className="App">
                <ValidContext.Provider value={{validState, setValidState}}>

                        <Routes>
                            <Route exact path="/" element={<InStockProducts/>}/>
                            <Route exact path="/create" element={<CreateProducts/>}/>
                            <Route exact path="/product/:id" element={<Products/>}/>
                            <Route exact path="/login" element={<Login/>}/>
                            <Route exact path="/main" element={<Main/>}/>
                            <Route exact path="/register" element={<Register/>}/>
                            <Route exact path="/removed/:id" element={<RemovedProducts/>}/>
                            <Route exact path="/edit/:id" element={<EditProducts/>}/>
                        </Routes>

                </ValidContext.Provider>
            </div>
        </Router>
    );
}

export default App;
