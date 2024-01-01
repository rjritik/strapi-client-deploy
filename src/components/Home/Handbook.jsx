import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import style from "./Handbook.module.css";
import Icons from "../Utilities/Icons/Icons";
import HTMLReactParser from "html-react-parser";
import { imagePlaceholder } from "../Utilities/ImagePlaceholder/ImagePlaceholder";
import { getHandbook } from "../../store/homeSlice";
import { useDispatch, useSelector } from "react-redux";

const Handbook = () => {
    const dispatch = useDispatch();
    const { handbookData } = useSelector((state) => state.home);

    useEffect(() => {
        setTimeout(() => {
            if (handbookData === null) {
                dispatch(getHandbook());
            }
        }, 625);
    }, []);

    return (
        <>
            <section
                className={`bg-primary text-white position-relative overflow-hidden ${style.handbook_section}`}
            >
                <div className="container">
                    <div className="row flex-column-reverse flex-md-row">
                        <div
                            className={`col-md-7 text-center text-md-start d-flex flex-wrap jus align-content-center py-5 ${style.content_column}`}
                        >
                            <div className="w-100">
                                {handbookData &&
                                handbookData.Author &&
                                handbookData.Author.length > 0 ? (
                                    <div className="author-name mb-2">
                                        {handbookData.Author}
                                    </div>
                                ) : (
                                    <div className="col-sm-4 mx-auto mx-md-0 mb-3">
                                        <Skeleton className="py-1 opacity-75" />
                                    </div>
                                )}

                                {handbookData &&
                                handbookData.Heading &&
                                handbookData.Heading.length > 0 ? (
                                    <h3 className="mb-4">
                                        {handbookData.Heading}
                                    </h3>
                                ) : (
                                    <h3 className="col-sm-5 col-md-8 mx-auto mx-md-0 mb-4">
                                        <Skeleton className="py-1 opacity-75" />
                                    </h3>
                                )}

                                {handbookData &&
                                handbookData.Description &&
                                handbookData.Description.length > 0 ? (
                                    HTMLReactParser(handbookData.Description)
                                ) : (
                                    <>
                                        <div className="mb-3">
                                            <Skeleton
                                                className="opacity-75"
                                                count={4}
                                            />
                                        </div>
                                        <div>
                                            <Skeleton
                                                className="opacity-75"
                                                count={4}
                                            />
                                        </div>
                                    </>
                                )}

                                {handbookData &&
                                handbookData.LearnMoreButton &&
                                handbookData.LearnMoreButton !== null ? (
                                    <Link
                                        className="btn btn-secondary btn-min-w mt-4"
                                        to={handbookData.LearnMoreButton.URL}
                                        target="_blank"
                                    >
                                        {handbookData.LearnMoreButton.Title}{" "}
                                        <Icons
                                            family="BsReactIcons"
                                            name="BsArrowRight"
                                        />
                                    </Link>
                                ) : (
                                    <Skeleton className="btn btn-skeleton btn-min-w mt-4 w-auto opacity-75" />
                                )}
                            </div>
                        </div>
                        <div
                            className={`col-md-5 d-flex flex-wrap align-content-center py-3 position-relative ${style.book_column}`}
                        >
                            {handbookData &&
                            handbookData.Image &&
                            handbookData.Image !== null ? (
                                <figure className="d-flex flex-wrap align-content-center m-0 mx-auto">
                                    <img
                                        className=""
                                        src={
                                            handbookData.Image
                                                ? handbookData.Image.url
                                                : imagePlaceholder
                                        }
                                        alt={handbookData.Image.alternativeText}
                                    />
                                </figure>
                            ) : (
                                <div className="col-8 col-sm-6 col-md-8 py-4 mx-auto">
                                    <figure className="ratio ratio-1x1 mb-0">
                                        <SkeletonTheme
                                            baseColor="#cee0fb"
                                            highlightColor="#e5f1ff"
                                        >
                                            <Skeleton className="align-top w-100 h-100 rounded-circle" />
                                        </SkeletonTheme>
                                    </figure>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Handbook;
