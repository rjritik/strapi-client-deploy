import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import tabStyle from "./../Utilities/Tabs/Tabs.module.css";
import accordianStyle from "./../Utilities/Accordian/Accordian.module.css";
import HTMLReactParser from "html-react-parser";
import LetsTalk from "../Utilities/Modal/LetsTalk";
import { useDispatch, useSelector } from "react-redux";
import { getIndustryExpertise } from "../../store/homeSlice";

const IndustryExpertise = () => {
    const [activeTab] = useState(0);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();
    const { industryExtertise, industryExtertiseData, status } = useSelector(
        (state) => state.home
    );

    useEffect(() => {
        setTimeout(() => {
            if (
                industryExtertise === null ||
                !industryExtertiseData.length > 0
            ) {
                dispatch(getIndustryExpertise());
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
                                {industryExtertise &&
                                industryExtertise.ExpertiseHeaderTilte ? (
                                    industryExtertise.ExpertiseHeaderTilte
                                ) : (
                                    <div className="col-sm-4 mx-auto">
                                        <Skeleton />
                                    </div>
                                )}
                            </h2>
                            <div className="text-center">
                                {industryExtertise &&
                                industryExtertise.ExpertiseButtonDescription ? (
                                    HTMLReactParser(
                                        `${industryExtertise.ExpertiseButtonDescription}`
                                    )
                                ) : (
                                    <div className="col-sm-8 col-lg-10 mx-auto">
                                        <Skeleton count={4} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-sm-12 d-none d-md-flex align-items-start">
                            {industryExtertiseData &&
                            industryExtertiseData &&
                            industryExtertiseData.length > 0 ? (
                                <Tabs
                                    defaultActiveKey={activeTab}
                                    className={`d-flex flex-wrap flex-shrink-1 pe-5 mb-3 col-md-5 ${tabStyle.tabs}`}
                                >
                                    {industryExtertiseData &&
                                        industryExtertiseData.map(
                                            (tab, index) => {
                                                return (
                                                    <Tab
                                                        key={tab.id}
                                                        eventKey={index}
                                                        title={
                                                            tab.TitleExpertise
                                                        }
                                                    >
                                                        {HTMLReactParser(
                                                            `${tab.DescriptionExpertise}`
                                                        )}
                                                        <h5 className="font-body fw-bold mt-4">
                                                            {
                                                                tab.MediaTitleExpertise
                                                            }
                                                        </h5>
                                                        <div className="row -mb-4">
                                                            {tab.MediaImagesExpertise.map(
                                                                (
                                                                    image,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                image.id
                                                                            }
                                                                            className="col-md-4 mb-4"
                                                                        >
                                                                            <Link
                                                                                to="/"
                                                                                className="d-block w-100 h-100"
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        image.url
                                                                                    }
                                                                                    alt=""
                                                                                    className="w-100 h-100 object-fit-cover rounded-3"
                                                                                />
                                                                            </Link>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </Tab>
                                                );
                                            }
                                        )}
                                </Tabs>
                            ) : (
                                <>
                                    <div className="d-flex flex-wrap flex-shrink-1 pe-5 mb-3 col-md-5">
                                        <div className="w-100">
                                            <Skeleton
                                                count={5}
                                                className="py-3 mb-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-100">
                                        <div className="w-100">
                                            <Skeleton
                                                count={3}
                                                className="w-100"
                                            />
                                            <Skeleton className="col-4 my-4" />
                                            <Skeleton
                                                count={4}
                                                className="col-md-6"
                                            />
                                            <h5 className="font-body fw-bold mt-4">
                                                <Skeleton className="col-4 py-1" />
                                            </h5>
                                            <div className="row -mb-4">
                                                <div className="col-md-4 mb-4">
                                                    <Skeleton className="d-block p-5 h-100 rounded-4" />
                                                </div>
                                                <div className="col-md-4 mb-4">
                                                    <Skeleton className="d-block p-5 h-100 rounded-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="col-sm-12 d-md-none">
                            <Accordion
                                defaultActiveKey={activeTab}
                                className={`${accordianStyle.accordian}`}
                            >
                                {industryExtertiseData.map(
                                    (accordian, index) => {
                                        return (
                                            <Accordion.Item
                                                key={accordian.id}
                                                eventKey={index}
                                                className="mb-3 border rounded-3 overflow-hidden"
                                            >
                                                <Accordion.Header className="font-body h5 fw-bold mb-0">
                                                    {accordian.TitleExpertise}
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    {HTMLReactParser(
                                                        `${accordian.DescriptionExpertise}`
                                                    )}
                                                    <h5 className="font-body fw-bold mt-4">
                                                        {
                                                            accordian.MediaTitleExpertise
                                                        }
                                                    </h5>
                                                    <div className="row -mb-4">
                                                        {accordian.MediaImagesExpertise.map(
                                                            (image, index) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            image.id
                                                                        }
                                                                        className="col-6 col-sm-4 mb-4"
                                                                    >
                                                                        <Link
                                                                            to="/"
                                                                            className="d-block w-100 h-100"
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    image.url
                                                                                }
                                                                                alt=""
                                                                                className="w-100 h-100 object-fit-cover rounded-3"
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        );
                                    }
                                )}
                            </Accordion>
                        </div>
                    </div>

                    <div className="row mt-4 mt-md-5">
                        <div className="col-sm-12 text-center">
                            {industryExtertise &&
                            industryExtertise.ExpertiseButtonTitle ? (
                                <Link
                                    className="btn btn-secondary btn-min-w"
                                    onClick={handleShow}
                                >
                                    {industryExtertise &&
                                        industryExtertise.ExpertiseButtonTitle}
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

export default IndustryExpertise;
