import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import SelectProgram from "./pages/SelectProgram";
import SelectEpisode from "./pages/SelectEpisode";

function App()
{
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route exact path="/" element={<SelectProgram />}></Route>
                <Route exact path="/selectProgram" element={<SelectProgram />}></Route>
                <Route exact path="/selectEpisode" element={<SelectEpisode />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
