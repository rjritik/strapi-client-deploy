import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import parser from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import style from "./SaasProjects.module.css";
import ProjectPaginatedItems from "../Projects/ProjectPaginatedItems";
import { useDispatch, useSelector } from "react-redux";
import { getSaasProjectsHeader } from "../../store/homeSlice";

const SaasProjects = () => {
    const dispatch = useDispatch();
    const { saasHomeHeader, saasHomeButton } = useSelector(
        (state) => state.home
    );

    useEffect(() => {
        setTimeout(() => {
            if (saasHomeHeader === null || saasHomeButton === null) {
                dispatch(getSaasProjectsHeader());
            }
        }, 625);
    }, []);

    return (
        <>
            <section className={`py-5 ${style.saas_projects_section}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 mb-4">
                            <h2 className="text-center fw-bold mb-4">
                                {saasHomeHeader && saasHomeHeader.Title ? (
                                    saasHomeHeader.Title
                                ) : (
                                    <div className="col-sm-4 mx-auto">
                                        <Skeleton />
                                    </div>
                                )}
                            </h2>
                            <div className="text-center">
                                {saasHomeHeader &&
                                saasHomeHeader.Description ? (
                                    parser(`${saasHomeHeader.Description}`)
                                ) : (
                                    <div className="col-sm-8 col-lg-10 mx-auto">
                                        <Skeleton count={3} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <ProjectPaginatedItems itemsPerPage={4} />

                    <div className="row">
                        <div className="col-sm-12 text-center mt-5">
                            {saasHomeButton && saasHomeButton.Title ? (
                                <Link
                                    className="btn btn-secondary"
                                    to={saasHomeButton.URL}
                                >
                                    {saasHomeButton.Title}
                                </Link>
                            ) : (
                                <Skeleton className="btn btn-outline btn-skeleton btn-min-w w-auto" />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SaasProjects;
