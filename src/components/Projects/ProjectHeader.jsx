import React, { useEffect } from "react";
import Waves from "../Utilities/Svg/Waves";
import HTMLReactParser from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { getProjectHeader } from "../../store/projectSlice";
import Head from "../Utilities/Head/Head";

const ProjectHeader = () => {
    const dispatch = useDispatch();
    const { projectHeader, projectSeo } = useSelector(
        (state) => state.projects
    );

    useEffect(() => {
        setTimeout(() => {
            if (projectHeader === null) {
                dispatch(getProjectHeader());
            }
        }, 625);
        if (projectSeo === null) {
            dispatch(getProjectHeader());
        }
    }, []);

    return (
        <>
            <Head
                seoTitle={projectSeo && projectSeo.MetaTitle}
                seoContent={projectSeo}
            />

            <section className="bg-gray3 pt-5 position-relative">
                <div className="container py-3">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 text-center mb-4">
                            <h1>
                                {projectHeader &&
                                projectHeader.Title !== null ? (
                                    projectHeader.Title
                                ) : (
                                    <Skeleton className="w-50" />
                                )}
                            </h1>

                            {projectHeader && projectHeader !== null ? (
                                HTMLReactParser(projectHeader.Description)
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
        </>
    );
};

export default ProjectHeader;
