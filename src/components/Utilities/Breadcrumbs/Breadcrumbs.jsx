import React from "react";
import style from "./Breadcrumbs.module.css";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ location }) => {
    const pageTitle = location[location.length - 1];
    const filterPageTitle = location[location.length - 1].split("-").join(" ");

    return (
        <>
            <section
                className={`py-2 py-lg-3 mt-2 mt-lg-3 -mb-3 border-top border-bottom ${style.breadcrumb_section}`}
            >
                <div className="container-fluid px-0">
                    <div className="row justify-content-between">
                        <h6 className="text-capitalize mb-0 w-auto">
                            {filterPageTitle}
                        </h6>

                        <nav
                            aria-label="breadcrumb"
                            className={`w-auto ${style.breadcrumb}`}
                        >
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                {location.slice(1).map((item, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={`breadcrumb-item ${
                                                item === pageTitle
                                                    ? "active"
                                                    : null
                                            }`}
                                        >
                                            {item === pageTitle ? (
                                                item.split("-").join(" ")
                                            ) : (
                                                <Link to={item}>
                                                    {item.split("-").join(" ")}
                                                </Link>
                                            )}
                                        </li>
                                    );
                                })}
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Breadcrumbs;
