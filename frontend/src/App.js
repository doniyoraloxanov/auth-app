import React from "react";
import { Outlet } from "react-router-dom";

const App = () => {
    return (
        <div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default App;
