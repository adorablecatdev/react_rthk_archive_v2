import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import SelectProgram from "./pages/SelectProgram";
import SelectEpisode from "./pages/SelectEpisode";
import Bookmark from "./pages/Bookmark";
import Home from "./pages/Home";

function App()
{
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/selectProgram" element={<SelectProgram />}></Route>
                <Route exact path="/selectEpisode" element={<SelectEpisode />}></Route>
                <Route exact path="/bookmark" element={<Bookmark />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
