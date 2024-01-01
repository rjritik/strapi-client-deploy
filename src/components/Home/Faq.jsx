import React, { useEffect, useState } from "react";
import style from "./../Utilities/Accordian/Accordian.module.css";
import Skeleton from "react-loading-skeleton";
import HTMLReactParser from "html-react-parser";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHomeFaq } from "../../store/homeSlice";

const Faq = () => {
    const [activeTab] = useState(0);

    const dispatch = useDispatch();
    const { homeFaqHeader, homeFaqData } = useSelector((state) => state.home);

    useEffect(() => {
        setTimeout(() => {
            if (homeFaqHeader === null) {
                dispatch(getHomeFaq());
            }
            if (!homeFaqData.length > 0) {
                dispatch(getHomeFaq());
            }
        }, 625);
    }, []);

    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 fw-bold text-center mb-4">
                            <h2 className="mb-4">
                                {homeFaqHeader ? (
                                    homeFaqHeader
                                ) : (
                                    <div className="col-sm-8 mx-auto">
                                        <Skeleton />
                                    </div>
                                )}
                            </h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-10 mx-auto">
                            {homeFaqData && homeFaqData.length > 0 ? (
                                <Accordion
                                    defaultActiveKey={activeTab}
                                    className={`${style.accordian}`}
                                >
                                    {homeFaqData.map((accordian, index) => {
                                        return (
                                            <Accordion.Item
                                                key={accordian.id}
                                                eventKey={index}
                                                className="mb-3 border rounded-3 overflow-hidden"
                                            >
                                                <Accordion.Header className="h5 fw-bold mb-0">
                                                    {HTMLReactParser(
                                                        accordian.Question
                                                    )}
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    {HTMLReactParser(
                                                        `${accordian.Answer}`
                                                    )}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        );
                                    })}
                                </Accordion>
                            ) : (
                                <Skeleton className="py-3 mb-3" count={7} />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Faq;
