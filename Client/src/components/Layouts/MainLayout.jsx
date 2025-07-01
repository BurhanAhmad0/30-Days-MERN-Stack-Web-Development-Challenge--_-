import { Outlet } from "react-router-dom"

import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Footer from "../Footer/Footer"

const MainLayout = () => {

    return (
        <>
            <header>
                <Navbar />
            </header>
            <div className="container">
                <Sidebar />
                <div className="App">
                    <Outlet />
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default MainLayout
