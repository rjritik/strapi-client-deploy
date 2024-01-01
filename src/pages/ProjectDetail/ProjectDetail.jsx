import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedProjects } from "../../store/projectSlice";
import { postURL } from "../../components/Utilities/PostURL/PostUrl";
import HTMLReactParser from "html-react-parser";
import Waves from "../../components/Utilities/Svg/Waves";
import Skeleton from "react-loading-skeleton";
import config from "../../config";
import style from "./ProjectDetail.module.css";
import "@lottiefiles/lottie-player/dist/tgs-player";

const ProjectDetail = () => {
    const [currentProject, setCurrentProject] = useState({});

    const location = useLocation();

    const dispatch = useDispatch();
    const { relatedProjects } = useSelector((state) => state.projects);

    useEffect(() => {
        if (!relatedProjects.length > 0) {
            if (currentProject.id) {
                dispatch(
                    getRelatedProjects(
                        currentProject.project_categories[0].CategoryName
                    )
                );
            }
        }
    }, [currentProject]);

    const postURLFunction = async (posturl, type) => {
        const apiResponse = await postURL(posturl, type);
        setCurrentProject(apiResponse.data.data[0]);
    };

    useEffect(() => {
        const slug = location?.pathname.split("/");
        postURLFunction(slug[slug.length - 1], "saas-projects");
    }, [location]);

    return (
        <>
            <section className="bg-gray3 pt-5 position-relative">
                <div className="container py-3">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 text-center mb-4">
                            <h1 className="mb-4">
                                {currentProject &&
                                currentProject.ProjectTitle ? (
                                    currentProject.ProjectTitle
                                ) : (
                                    <Skeleton className="w-50" />
                                )}
                            </h1>

                            {currentProject &&
                            currentProject.ShortDescription ? (
                                HTMLReactParser(currentProject.ShortDescription)
                            ) : (
                                <>
                                    <Skeleton className="w-75" />
                                    <Skeleton className="w-100" />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="wave_icon py-4 py-md-5 mt-3">
                    <Waves />
                </div>
            </section>

            {currentProject?.Description && (
                <section className={`py-5 ${style.project_content_section}`}>
                    {HTMLReactParser(`${currentProject.Description}`)}
                </section>
            )}

            {relatedProjects && (
                <section className="pb-5 mb-0 mb-md-4 text-center">
                    <div className="container">
                        <div className="row mb-4">
                            <div className="col-sm-12">
                                <h3>You may also like</h3>
                            </div>
                        </div>
                        <div className="row justify-content-center -mb-4">
                            {relatedProjects
                                .filter(
                                    (item) =>
                                        item.ProjectTitle !==
                                        currentProject.ProjectTitle
                                )
                                .slice(0, 3)
                                .map((item, index) => {
                                    return (
                                        <div
                                            key={item.id}
                                            className={`col-md-4 mb-4 position-relative overflow-hidden ${style.related_project_item}`}
                                        >
                                            <Link
                                                to={`${config.FRONTEND_URL}/projects/${item.PostURL}`}
                                                className="d-block w-100 h-100 rounded-3 overflow-hidden"
                                            >
                                                <figure className="mb-0 w-100 h-100">
                                                    <img
                                                        className="w-100 h-100 object-fit-cover"
                                                        src={
                                                            item
                                                                .ProjectThumbnail
                                                                .url
                                                        }
                                                        alt=""
                                                    />
                                                </figure>
                                                <h4 className="font-body text-white fw-medium text-decoration-underline lh-body p-3 mb-0 w-100 position-absolute top-50 start-50 translate-middle z-1">
                                                    {item.ProjectTitle}
                                                </h4>
                                            </Link>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default ProjectDetail;
