import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./navbar.module.css";
import { useValueAuth } from "../../context/authContext";

function Navbar() {
  const { authentication, setAuthentication } = useValueAuth();
  const handleSignOut=()=>{
    setAuthentication(null)
  }
  return (
    <>
      <div className={styles.navBarContainer}>
        <NavLink to="/">
          <p>Busy Buy</p>
        </NavLink>
        <div className={styles.navLinksContainer}>
          <NavLink to="/" className={styles.navLink}>
            <img
              width="40"
              height="40"
              src="https://img.icons8.com/plasticine/100/home-page.png"
              alt="home-page"
            />
            <h3>Home</h3>
          </NavLink>
          {authentication ? (
            <>
              <NavLink to="/my-orders" className={styles.navLink}>
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/office/100/shopping-basket.png"
                  alt="shopping-basket"
                />
                <h3>My orders</h3>
              </NavLink>
              <NavLink to="/cart" className={styles.navLink}>
                <img
                  width="35"
                  height="35"
                  src="https://img.icons8.com/avantgarde/100/shopping-cart--v1.png"
                  alt="shopping-cart--v1"
                />
                <h3>Cart</h3>
              </NavLink>
              <NavLink to="/" onClick={()=>handleSignOut()} className={styles.navLink}>
              <img width="35" height="35" src="https://img.icons8.com/cute-clipart/64/exit.png" alt="exit"/>
                <h3>Logout</h3></NavLink>

            </>
          ) : (
            <NavLink to="/sign-in" className={styles.navLink}>
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/officel/100/door-opened.png"
                alt="door-opened"
              />{" "}
              <h3>SignIn</h3>
            </NavLink>
          )}
        </div>
      </div>
      <div className={styles.mainContent}>
      <Outlet />
      </div>
      

    </>
  );
}

export default Navbar;
