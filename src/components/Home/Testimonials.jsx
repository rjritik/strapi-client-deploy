import React, { useEffect, useState } from "react";
import Icons, { iconMapFunction } from "../Utilities/Icons/Icons";
import HTMLReactParser from "html-react-parser";
import style from "./Testimonials.module.css";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import LetsTalk from "../Utilities/Modal/LetsTalk";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTestimonials } from "../../store/homeSlice";

const Testimonials = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();
    const { testimonialHeader, testimonialData, testimonialButton, status } =
        useSelector((state) => state.home);

    useEffect(() => {
        setTimeout(() => {
            if (
                testimonialHeader === null ||
                !testimonialData.length > 0 ||
                testimonialButton === null
            ) {
                dispatch(getTestimonials());
            }
        }, 625);
    }, []);

    const totalStars = 5;

    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 fw-bold text-center mb-4">
                            <h2 className="mb-4">
                                {testimonialHeader &&
                                testimonialHeader.Title ? (
                                    testimonialHeader.Title
                                ) : (
                                    <div className="col-sm-4 mx-auto">
                                        <Skeleton />
                                    </div>
                                )}
                            </h2>

                            <h4>
                                {testimonialHeader &&
                                testimonialHeader.Description ? (
                                    HTMLReactParser(
                                        `${testimonialHeader.Description}`
                                    )
                                ) : (
                                    <div className="col-sm-8 col-lg-10 mx-auto">
                                        <Skeleton count={2} />
                                    </div>
                                )}
                            </h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <Carousel
                                className={`p-3 p-md-4 border rounded-3 ${style.testimonials}`}
                            >
                                {testimonialData &&
                                testimonialData.length > 0 ? (
                                    testimonialData.map((item, index) => {
                                        const iconData = iconMapFunction(
                                            `${
                                                item.Icon &&
                                                item.Icon !== null &&
                                                item.Icon
                                            }`
                                        );

                                        return (
                                            <Carousel.Item key={item.id}>
                                                <Carousel.Caption className="text-primary text-start p-0 position-static">
                                                    <div className="row flex-column-reverse flex-md-row">
                                                        <div
                                                            className={`${
                                                                item.Image &&
                                                                item.Image !==
                                                                    null
                                                                    ? "col-md-9"
                                                                    : "col-md-12"
                                                            }`}
                                                        >
                                                            {item.Title && (
                                                                <h4 className="text-green">
                                                                    {item.Title}
                                                                </h4>
                                                            )}
                                                            {item.Ratings && (
                                                                <div className="d-flex flex-wrap align-items-center mb-3">
                                                                    <span
                                                                        className={`text-green -mt-111 me-3 ${style.rating_wrapper}`}
                                                                    >
                                                                        <span
                                                                            className={
                                                                                style.rating
                                                                            }
                                                                        >
                                                                            {[
                                                                                ...new Array(
                                                                                    totalStars
                                                                                ),
                                                                            ].map(
                                                                                (
                                                                                    star,
                                                                                    index
                                                                                ) => {
                                                                                    return index <
                                                                                        item.Ratings ? (
                                                                                        <span
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                        >
                                                                                            <Icons
                                                                                                family="FaReactIcons"
                                                                                                name="FaStar"
                                                                                            />{" "}
                                                                                        </span>
                                                                                    ) : (
                                                                                        <span
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                        >
                                                                                            <Icons
                                                                                                family="FaReactIcons"
                                                                                                name="FaRegStar"
                                                                                            />{" "}
                                                                                        </span>
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </span>
                                                                        <span className="num text-primary fw-bold">
                                                                            {
                                                                                item.Ratings
                                                                            }
                                                                        </span>
                                                                    </span>
                                                                    <span className="date">
                                                                        {
                                                                            item.Date
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {item.Description && (
                                                                <div className="mb-3">
                                                                    {HTMLReactParser(
                                                                        `${item.Description}`
                                                                    )}
                                                                </div>
                                                            )}
                                                            <div
                                                                className={`d-flex ${style.author_wrapper}`}
                                                            >
                                                                {item.profileImage &&
                                                                    item.profileImage !==
                                                                        null && (
                                                                        <div className="flex-shrink-1 me-3">
                                                                            <Link
                                                                                to={
                                                                                    item.socialIconURL &&
                                                                                    item.socialIconURL !==
                                                                                        null &&
                                                                                    item.socialIconURL
                                                                                }
                                                                                target="_blank"
                                                                                className={`d-inline-block ${
                                                                                    item.Icon &&
                                                                                    item.Icon !==
                                                                                        null
                                                                                        ? ""
                                                                                        : "pe-none"
                                                                                }`}
                                                                            >
                                                                                <img
                                                                                    className="rounded-circle"
                                                                                    src={
                                                                                        item
                                                                                            .profileImage
                                                                                            .url
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                            </Link>
                                                                        </div>
                                                                    )}
                                                                <div className="w-100">
                                                                    <Link
                                                                        to={
                                                                            item.socialIconURL &&
                                                                            item.socialIconURL !==
                                                                                null &&
                                                                            item.socialIconURL
                                                                        }
                                                                        target="_blank"
                                                                        className={`fw-bold d-table border-primary w-auto ${
                                                                            item.profileImage &&
                                                                            item.profileImage !==
                                                                                null
                                                                                ? "pb-1 mb-1 border-bottom"
                                                                                : ""
                                                                        } ${
                                                                            item.Icon &&
                                                                            item.Icon !==
                                                                                null
                                                                                ? ""
                                                                                : "pe-none"
                                                                        }`}
                                                                    >
                                                                        {item.AuthorName
                                                                            ? item.AuthorName
                                                                            : ""}

                                                                        {item.Icon &&
                                                                            item.Icon !==
                                                                                null && (
                                                                                <>
                                                                                    ,{" "}
                                                                                    {
                                                                                        "  "
                                                                                    }
                                                                                    <Icons
                                                                                        family={
                                                                                            iconData
                                                                                        }
                                                                                        name={
                                                                                            item.Icon
                                                                                        }
                                                                                    />
                                                                                </>
                                                                            )}
                                                                    </Link>

                                                                    {item.AuthorDesignation && (
                                                                        <div className="fs-6">
                                                                            {
                                                                                item.AuthorDesignation
                                                                            }
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {item.Image &&
                                                            item.Image !==
                                                                null && (
                                                                <div className="col-md-3 mb-3 mb-md-0">
                                                                    <img
                                                                        src={
                                                                            item
                                                                                .Image
                                                                                .url
                                                                        }
                                                                        alt=""
                                                                        className={`rounded-3 ${style.img_right}`}
                                                                    />
                                                                </div>
                                                            )}
                                                    </div>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                        );
                                    })
                                ) : (
                                    <>
                                        <h4 className="mb-2">
                                            <Skeleton className="col-sm-6" />
                                        </h4>
                                        <Skeleton className="col-sm-5 mb-4" />
                                        <Skeleton className="" count={3} />
                                        <Skeleton className="col-sm-8 mb-4" />
                                        <Skeleton className="col-sm-2" />
                                        <Skeleton className="col-sm-4" />
                                    </>
                                )}
                            </Carousel>
                        </div>
                    </div>

                    <div className="row mt-4 mt-md-5">
                        <div className="col-sm-12 text-center">
                            {testimonialButton && testimonialButton.Title ? (
                                <Link
                                    className="btn btn-secondary btn-min-w"
                                    onClick={handleShow}
                                >
                                    {testimonialButton.Title}
                                </Link>
                            ) : (
                                <Skeleton className="btn btn-skeleton btn-min-w w-auto" />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <LetsTalk show={show} onHide={handleClose} />
        </>
    );
};

export default Testimonials;
