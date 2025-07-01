import styles from "./Navbar.module.css";
import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";

import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const { CountState, user } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/logout",
        {}, // empty body (or your logout payload, if needed)
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Logout successful:", response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <Link to={"/"}>
        <h1>30 Days</h1>
      </Link>
      <ul className={styles.navLinks}>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/count"}>Counter</Link>
        </li>
        <li>
          <Link to={"/chat"}>Chat</Link>
        </li>
        {user ? (
          <li>
            <Link to={`/profile/${user.username}`}>Profile</Link>
          </li>
        ) : (
          <li>
            <Link to={"/register"}>Register</Link>
          </li>
        )}
        {user ? (
          <li>
            <button
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        )}
      </ul>
      <div className={styles.userInfo}>
        <p>{CountState.count}</p>
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
