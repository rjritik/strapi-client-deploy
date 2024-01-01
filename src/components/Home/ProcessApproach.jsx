import React, { useEffect, useState } from "react";
import Icons, { iconMapFunction } from "../Utilities/Icons/Icons";
import HTMLReactParser from "html-react-parser";
import style from "./ProcessApproach.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import LetsTalk from "../Utilities/Modal/LetsTalk";
import { useDispatch, useSelector } from "react-redux";
import { getProcessApproach } from "../../store/homeSlice";

const ProcessApproach = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();
    const {
        processApproachHeader,
        processApproachData,
        processApproachButton,
    } = useSelector((state) => state.home);

    useEffect(() => {
        setTimeout(() => {
            if (
                processApproachHeader === null ||
                !processApproachData.length > 0 ||
                processApproachButton === null
            ) {
                dispatch(getProcessApproach());
            }
        }, 625);
    }, []);

    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 mb-5">
                            <h2 className="text-center fw-bold mb-4">
                                {processApproachHeader &&
                                processApproachHeader.Title ? (
                                    processApproachHeader.Title
                                ) : (
                                    <div className="col-sm-4 mx-auto">
                                        <Skeleton />
                                    </div>
                                )}
                            </h2>
                            <div className="text-center">
                                {processApproachHeader &&
                                processApproachHeader.Description ? (
                                    HTMLReactParser(
                                        `${processApproachHeader.Description}`
                                    )
                                ) : (
                                    <div className="col-sm-8 col-lg-10 mx-auto">
                                        <Skeleton count={2} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={`${style.process_steps}`}>
                        {processApproachData &&
                        processApproachData.length > 0 ? (
                            processApproachData.map((step, index) => {
                                const iconData = iconMapFunction(
                                    step.ProcessIcon
                                );
                                return (
                                    <div className="row mb-4" key={step.id}>
                                        <div className="col-md-3 mb-4 mb-md-0">
                                            <div className="bg-primary-light1 p-3 h-100 rounded-4">
                                                <span className="d-block">
                                                    {step.ProcessStepTitle}
                                                </span>
                                                <div className="h1">
                                                    <Icons
                                                        family={iconData}
                                                        name={step.ProcessIcon}
                                                    />
                                                </div>
                                                <h3 className="fw-bold mb-0">
                                                    {step.ProcessTitle}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="col-md-9">
                                            <h4 className="fw-bold">
                                                {step.ProcessContentTitle}
                                            </h4>
                                            {HTMLReactParser(
                                                `${step.ProcessDiscription}`
                                            )}
                                            {HTMLReactParser(
                                                `${step.ProcessListContent}`
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="row mb-4">
                                <div className="col-md-3 mb-4 mb-md-0">
                                    <div className="bg-primary-light1 p-3 h-100 rounded-4">
                                        <span className="d-block">
                                            <SkeletonTheme
                                                baseColor="#cee0fb"
                                                highlightColor="#e5f1ff"
                                            >
                                                <Skeleton className="col-sm-4" />
                                            </SkeletonTheme>
                                        </span>
                                        <div className="h1">
                                            <SkeletonTheme
                                                baseColor="#cee0fb"
                                                highlightColor="#e5f1ff"
                                            >
                                                <Skeleton className="col-2 px-5 py-0" />
                                            </SkeletonTheme>
                                        </div>
                                        <h3 className="fw-bold mb-0">
                                            <SkeletonTheme
                                                baseColor="#cee0fb"
                                                highlightColor="#e5f1ff"
                                            >
                                                <Skeleton className="col-8" />
                                            </SkeletonTheme>
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <h4 className="fw-bold">
                                        <Skeleton />
                                    </h4>
                                    <div className="mb-3">
                                        <Skeleton count={4} />
                                    </div>
                                    <Skeleton count={8} className="col-md-6" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="row mt-4 mt-md-5">
                        <div className="col-sm-12 text-center">
                            {processApproachButton &&
                            processApproachButton.Title ? (
                                <Link
                                    className="btn btn-secondary btn-min-w"
                                    onClick={handleShow}
                                >
                                    {processApproachButton.Title}
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

export default ProcessApproach;
