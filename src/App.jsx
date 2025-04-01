import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import { APIContext } from "./APIContext";

export default function App() {
    const apiURL = 'https://vercel-healthmonitoringapi.vercel.app';
    return (
        <>
            <APIContext.Provider value={{apiURL}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/signin" element={<AuthPage />} />
                        <Route path="/main" element={<MainPage />} />
                    </Routes>
                </BrowserRouter>
            </APIContext.Provider>
        </>
    );
}