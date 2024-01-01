import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { postURL } from "../Utilities/PostURL/PostUrl";
import style from "./ProjectPaginatedItems.module.css";
import SaasItemSkeleton from "../Utilities/SkeletonItem/SaasItemSkeleton";

const ProjectItems = ({ currentItems }) => {
    const navigate = useNavigate();

    const postURLFunction = async (posturl, type) => {
        const apiResponse = await postURL(posturl, type);
        navigate(`/projects/${apiResponse.data.data[0].PostURL}`);
    };

    return (
        <>
            <div className={`row ${style.projects_wrapper}`}>
                {currentItems && currentItems.length > 0 ? (
                    currentItems.map((project, index) => {
                        return (
                            <div
                                key={project.id}
                                className={`col-sm-6 mt-4 ${style.project_box}`}
                            >
                                <Link
                                    className="bg-white text-center text-hover-underline d-block h-100 rounded-3 shadow-sm overflow-hidden"
                                    onClick={
                                        (e) =>
                                            postURLFunction(
                                                project.PostURL,
                                                "saas-projects"
                                            ) // slug, type
                                    }
                                >
                                    {project.ProjectThumbnailVideo &&
                                    project.ProjectThumbnailVideo.url.length >
                                        0 ? (
                                        <div className="m-0 ratio ratio-4x3 overflow-hidden">
                                            <video
                                                width="320"
                                                height="240"
                                                autoPlay
                                                className="bg-gray"
                                                style={{
                                                    transform: "scale(1.4)",
                                                }}
                                            >
                                                <source
                                                    src={
                                                        project
                                                            .ProjectThumbnailVideo
                                                            .url
                                                    }
                                                    type="video/mp4"
                                                />
                                                Your browser does not support
                                                the video tag.
                                            </video>
                                        </div>
                                    ) : (
                                        <figure className="m-0 ratio ratio-4x3">
                                            <img
                                                src={
                                                    project.ProjectThumbnail.url
                                                }
                                                alt={
                                                    project.ProjectThumbnail
                                                        .alternativeText
                                                }
                                                loading="lazy"
                                                className="w-100 h-100 object-fit-cover"
                                            />
                                        </figure>
                                    )}

                                    <h4 className="font-body fw-normal p-3 mb-0">
                                        {project.ProjectTitle}
                                    </h4>
                                </Link>
                            </div>
                        );
                    })
                ) : (
                    <>
                        <SaasItemSkeleton />
                        <SaasItemSkeleton />
                        <SaasItemSkeleton />
                        <SaasItemSkeleton />
                    </>
                )}
            </div>
        </>
    );
};

export default ProjectItems;
