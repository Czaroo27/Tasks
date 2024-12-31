import "./App.css";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login/Login";
import Register from "./Login/Register/Register";
import MainView from "./Main/MainView";

function App() {
    return (
        <div className="App">
            <NextUIProvider>
                <MainView />
                <Router>
                    <Routes>
                        <Route path="/main" element={<MainView />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Router>
            </NextUIProvider>
        </div>

    );
}

export default App;
