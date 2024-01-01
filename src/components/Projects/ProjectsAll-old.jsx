import React, { useEffect, useState } from "react";
import config from "../../config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { postURL } from "../Utilities/PostURL/PostUrl";
import SaasItemSkeleton from "../Utilities/SkeletonItem/SaasItemSkeleton";
import style from "./ProjectsAll.module.css";

const ProjectsAll = ({ projectsCount }) => {
    const [allProjects, setAllProjects] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function AllProjectsData() {
            try {
                const allProjectsAPI = await axios.get(
                    `${config.BACKEND_URL}/api/saas-projects?populate=*`
                );

                setTimeout(() => {
                    setAllProjects(allProjectsAPI.data.data);
                }, 625);
            } catch (error) {
                console.error(error);
            }
        }

        AllProjectsData();
    }, []);

    const postURLFunction = async (posturl, type) => {
        const apiResponse = await postURL(posturl, type);
        navigate(`/projects/${apiResponse.data.data[0].PostURL}`, {
            state: apiResponse.data.data[0].Description,
        });
    };

    return (
        <>
            <div className={`row ${style.projects_wrapper}`}>
                {allProjects && allProjects.length > 0 ? (
                    allProjects
                        .slice(0, projectsCount)
                        .map((project, index) => {
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
                                        project.ProjectThumbnailVideo.url
                                            .length > 0 ? (
                                            <div className="m-0 ratio ratio-4x3 ratio-16x999 overflow-hidden">
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
                                                    Your browser does not
                                                    support the video tag.
                                                </video>
                                            </div>
                                        ) : (
                                            <figure className="m-0 ratio ratio-4x3">
                                                <img
                                                    src={
                                                        project.ProjectThumbnail
                                                            .formats.medium.url
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

export default ProjectsAll;
