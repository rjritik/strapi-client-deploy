import React, { useEffect, useState } from "react";
import Icons, { iconMapFunction } from "../Utilities/Icons/Icons";
import { Link } from "react-router-dom";
import LetsTalk from "../Utilities/Modal/LetsTalk";
import parse from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import ServiceItemSkeleton from "../Utilities/SkeletonItem/ServiceItemSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { getHomeServicesData } from "../../store/homeSlice";
import style from "./HomeServices.module.css";

const HomeServices = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();
    const {
        homeServicesHeaderData,
        homeServicesButtonData,
        homeServicesListData,
    } = useSelector((state) => state.home);

    useEffect(() => {
        setTimeout(() => {
            if (
                homeServicesHeaderData === null ||
                homeServicesHeaderData === null ||
                !homeServicesListData.length > 0
            ) {
                dispatch(getHomeServicesData());
            }
        }, 625);
    }, []);

    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 mb-4">
                            <h2 className="text-center fw-bold mb-4">
                                {homeServicesHeaderData &&
                                homeServicesHeaderData.Title !== null ? (
                                    homeServicesHeaderData.Title
                                ) : (
                                    <div className="col-sm-4 mx-auto">
                                        <Skeleton />
                                    </div>
                                )}
                            </h2>
                            <div className="text-center">
                                {homeServicesHeaderData &&
                                homeServicesHeaderData.Description !== null ? (
                                    parse(
                                        `${homeServicesHeaderData.Description}`
                                    )
                                ) : (
                                    <div className="col-sm-8 col-lg-10 mx-auto">
                                        <Skeleton count={2} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={`row mt-4 ${style.services_wrapper}`}>
                        {homeServicesListData &&
                        homeServicesListData.length > 0 ? (
                            homeServicesListData.map((service, index) => {
                                const iconData = iconMapFunction(
                                    service.serviceIcons
                                );
                                return (
                                    <div
                                        key={service.id}
                                        className={`col-sm-6 col-md-4 col-lg-3 text-center mb-4 mb-sm-5 ${style.service_box}`}
                                    >
                                        <Link
                                            key={service.id}
                                            className="display-5 d-table mx-auto mb-3 mb-md-4"
                                            onClick={handleShow}
                                        >
                                            <Icons
                                                className="mb-0"
                                                family={iconData}
                                                name={service.serviceIcons}
                                            />
                                        </Link>

                                        <h4 className="fw-bold">
                                            <Link
                                                className="d-table mx-auto"
                                                onClick={handleShow}
                                            >
                                                {service.Title}
                                            </Link>
                                        </h4>
                                        <div className="description-link-underline">
                                            {parse(`${service.Description}`)}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <>
                                <ServiceItemSkeleton />
                                <ServiceItemSkeleton />
                                <ServiceItemSkeleton />
                                <ServiceItemSkeleton />
                                <ServiceItemSkeleton />
                                <ServiceItemSkeleton />
                                <ServiceItemSkeleton />
                                <ServiceItemSkeleton />
                            </>
                        )}
                    </div>
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            {homeServicesButtonData &&
                            homeServicesButtonData.Title !== null ? (
                                <Link
                                    className="btn btn-secondary btn-min-w"
                                    to={homeServicesButtonData.URL}
                                    onClick={handleShow}
                                >
                                    {homeServicesButtonData.Title}
                                </Link>
                            ) : (
                                <Skeleton className="btn btn-secondary btn-skeleton btn-min-w w-auto" />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <LetsTalk show={show} onHide={handleClose} />
        </>
    );
};

export default HomeServices;
