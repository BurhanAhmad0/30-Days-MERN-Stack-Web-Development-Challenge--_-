import { Outlet, useLocation } from "react-router-dom"

import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"

const RegisterLayout = () => {

    const location = useLocation();

    return (
        <>
            <header>
                <Navbar />
            </header>
            <div className="container">
                <div className="App">
                    {(location.pathname === '/register') && <div className="progessBar" id='progessBar'></div>}
                    <Outlet />
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default RegisterLayout
