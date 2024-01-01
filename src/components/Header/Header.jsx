import React, { useEffect, useState } from "react";
import style from "./Header.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Icons, { iconMapFunction } from "./../Utilities/Icons/Icons";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { getHeaderData, setTheme } from "../../store/headerSlice";
import Breadcrumbs from "../Utilities/Breadcrumbs/Breadcrumbs";

const Header = ({ resize }) => {
    // ======  breadcrumb start ==========

    const location = useLocation();
    const locationData = location.pathname.split("/");
    const homePage = locationData[1];

    // ======  breadcrumb end ==========

    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const { logoData, menuItemData, socialIconData, themeData, theme, status } =
        useSelector((state) => state.header);

    if (theme === null) {
        localStorage.setItem("theme", "light-mode");
    }

    useEffect(() => {
        if (
            menuItemData === null ||
            !menuItemData.length > 0 ||
            !socialIconData.length > 0 ||
            !themeData.length > 0 ||
            theme === null
        ) {
            setTimeout(() => {
                dispatch(getHeaderData());
            }, 625);
        }
    }, []);

    useEffect(() => {
        dispatch(setTheme(localStorage.getItem("theme")));
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        if (theme === "light-mode") {
            dispatch(setTheme("dark-mode"));
            localStorage.setItem("theme", "dark-mode");
        } else {
            dispatch(setTheme("light-mode"));
            localStorage.setItem("theme", "light-mode");
        }
    };

    const handleMenu = () => {
        const toggleButton = document.querySelector("header .navbar-toggler");
        const navbarCollapse = document.querySelector(
            "header .navbar-collapse"
        );

        toggleButton?.classList.toggle("collapsed");
        navbarCollapse?.classList.toggle("show");
    };

    return (
        <>
            <header
                className={`bg-white py-2 py-lg-3 border-bottom sticky-top transition ${style.header}`}
            >
                <div className="container-fluid">
                    <Navbar expand="lg" className={`py-0 ${style.navbar}`}>
                        <div className={`${style.mobile_nav}`}>
                            <div
                                className={`d-flex flex-wrap d-lg-none ${style.toggle_wrapper}`}
                            >
                                <Navbar
                                    aria-controls="navbar-nav"
                                    className={`navbar-toggler border-0 position-relative overflow-hidden rounded-0 ${style.navbar_toggler}`}
                                    onClick={resize <= 991 ? handleMenu : null}
                                >
                                    <span className="top"></span>
                                    <span className="middle"></span>
                                    <span className="bottom"></span>
                                </Navbar>
                            </div>

                            {logoData ? (
                                <Link
                                    to="/"
                                    className={`navbar-brand ${style.logo}`}
                                >
                                    <img
                                        src={logoData.url}
                                        alt={logoData.alternativeText}
                                    />
                                </Link>
                            ) : (
                                <Skeleton className="px-4 py-2" />
                            )}
                            <div
                                className={`d-lg-none ${style.mobile_contact}`}
                            >
                                <Link className="d-table ms-auto" to="/contact">
                                    Contact Me
                                </Link>
                            </div>
                        </div>

                        <Navbar.Collapse
                            id="navbar-nav"
                            className={`${style.navbar_nav}`}
                        >
                            <Nav className={`ms-auto ${style.menu_wrapper}`}>
                                {menuItemData && menuItemData.length > 0 ? (
                                    menuItemData.map((menu, index) => {
                                        return (
                                            <NavLink
                                                key={menu.id}
                                                className={`nav-link ${
                                                    menu.MenuLink === "/contact"
                                                        ? "nav-link-contact"
                                                        : ""
                                                }`}
                                                to={menu.MenuLink}
                                                onClick={
                                                    resize <= 991
                                                        ? handleMenu
                                                        : null
                                                }
                                            >
                                                {menu.MenuTitle}
                                            </NavLink>
                                        );
                                    })
                                ) : (
                                    <NavLink className="nav-link">
                                        <span className="mx-2">
                                            <Skeleton className="px-5" />
                                        </span>
                                        <span className="mx-2">
                                            <Skeleton className="px-5" />
                                        </span>
                                        <span className="mx-2">
                                            <Skeleton className="px-5" />
                                        </span>
                                        <span className="mx-2">
                                            <Skeleton className="px-5" />
                                        </span>
                                        <span className="mx-2">
                                            <Skeleton className="px-5" />
                                        </span>
                                    </NavLink>
                                )}
                            </Nav>
                            <Nav className={`${style.social_icons_wrapper}`}>
                                {socialIconData && socialIconData.length > 0 ? (
                                    socialIconData.map((icon, index) => {
                                        let iconData = iconMapFunction(
                                            icon.Icon
                                        );
                                        return (
                                            <Link
                                                key={icon.id}
                                                className=""
                                                to={icon.Link}
                                                target="_blank"
                                            >
                                                <Icons
                                                    family={iconData}
                                                    name={icon.Icon}
                                                />
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <>
                                        <span className="me-4">
                                            <Skeleton className="px-3 py-1" />
                                        </span>
                                        <span className="me-4">
                                            <Skeleton className="px-3 py-1" />
                                        </span>
                                        <span className="me-4">
                                            <Skeleton className="px-3 py-1" />
                                        </span>
                                        <span className="me-4">
                                            <Skeleton className="px-3 py-1" />
                                        </span>
                                    </>
                                )}

                                {themeData && themeData.length > 0 ? (
                                    <Link
                                        to="#"
                                        className=""
                                        onClick={toggleTheme}
                                    >
                                        <Icons
                                            family={
                                                theme === "light-mode"
                                                    ? iconMapFunction(
                                                          themeData[0].Icon
                                                      )
                                                    : iconMapFunction(
                                                          themeData[1].Icon
                                                      )
                                            }
                                            name={
                                                theme === "light-mode"
                                                    ? themeData[0].Icon
                                                    : themeData[1].Icon
                                            }
                                            className={
                                                theme === "light-mode"
                                                    ? "aaa"
                                                    : "bbb"
                                            }
                                        />
                                    </Link>
                                ) : (
                                    <span className="me-3">
                                        <Skeleton className="px-3 py-1" />
                                    </span>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                    {/* breadcrumb */}
                    {/* {homePage === "" ? null : (
                        <Breadcrumbs location={locationData} />
                    )} */}
                </div>
            </header>
        </>
    );
};

export default Header;
