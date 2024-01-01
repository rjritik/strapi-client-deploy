import React from "react";
import Navigation from "./Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import ScrollToTop from "./components/Utilities/ScrollToTop/ScrollToTop";

const App = () => {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter basename="/">
                    <ScrollToTop>
                        <Routes>
                            <Route path="/*" element={<Navigation />} />
                        </Routes>
                    </ScrollToTop>
                </BrowserRouter>
            </Provider>
        </>
    );
};

export default App;
