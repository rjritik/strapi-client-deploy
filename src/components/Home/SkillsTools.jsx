import React, { useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import SkillsItemSkeleton from "../Utilities/SkeletonItem/SkillsItemSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { getSkillsTools } from "../../store/homeSlice";

const SkillsTools = () => {
    const dispatch = useDispatch();
    const { skillsToolsHeader, skillsToolsData } = useSelector(
        (state) => state.home
    );

    useEffect(() => {
        setTimeout(() => {
            if (skillsToolsHeader === null || !skillsToolsData.length > 0) {
                dispatch(getSkillsTools());
            }
        }, 625);
    }, []);

    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 mb-4 mb-md-5">
                            {skillsToolsHeader &&
                            skillsToolsHeader.Title &&
                            skillsToolsHeader.Title !== null ? (
                                <h2 className="text-center fw-bold mb-4">
                                    {skillsToolsHeader.Title}
                                </h2>
                            ) : (
                                <h2 className="col-4 mx-auto mb-4">
                                    <Skeleton />
                                </h2>
                            )}
                            {skillsToolsHeader &&
                            skillsToolsHeader.Description &&
                            skillsToolsHeader.Description !== null ? (
                                <div className="text-center">
                                    {HTMLReactParser(
                                        skillsToolsHeader.Description
                                    )}
                                </div>
                            ) : (
                                <div className="-mb-3">
                                    <Skeleton className="mx-auto" />
                                    <Skeleton className="col-10 d-flex mx-auto" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="row -mb-4">
                        {skillsToolsData && skillsToolsData.length > 0 ? (
                            skillsToolsData.map((item, index) => {
                                return (
                                    <div
                                        key={item.id}
                                        className="col-6 col-md-3 text-center child-list-unstyled mb-4"
                                    >
                                        <h4>{item.Title}</h4>
                                        {HTMLReactParser(item.Description)}
                                    </div>
                                );
                            })
                        ) : (
                            <>
                                <SkillsItemSkeleton />
                                <SkillsItemSkeleton />
                                <SkillsItemSkeleton />
                                <SkillsItemSkeleton />
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default SkillsTools;
