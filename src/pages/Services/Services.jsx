import React, { useEffect } from "react";
import Head from "../../components/Utilities/Head/Head";
import Testimonials from "../../components/Home/Testimonials";
import Waves from "../../components/Utilities/Svg/Waves";
import { Link } from "react-router-dom";
import style from "./Services.module.css";
import styleAccordian from "./../../components/Utilities/Accordian/Accordian.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getServiceData } from "../../store/serviceSlice";
import Skeleton from "react-loading-skeleton";
import HTMLReactParser from "html-react-parser";
import { Accordion } from "react-bootstrap";

const Services = () => {
    const dispatch = useDispatch();
    const {
        serviceHeader,
        serviceTopContent,
        serviceMiddleContent,
        serviceBottomContent,
        faqData,
        status,
    } = useSelector((state) => state.service);

    useEffect(() => {
        setTimeout(() => {
            if (
                serviceHeader === null ||
                !serviceTopContent.length > 0 ||
                serviceMiddleContent === null ||
                !serviceBottomContent.length > 0 ||
                faqData === null
            ) {
                dispatch(getServiceData());
            }
        }, 625);
    }, []);

    return (
        <>
            <Head seoTitle="Services" />

            <section className="bg-gray3 pt-5 position-relative">
                <div className="container py-3">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 text-center mb-4">
                            <h1 className="mb-4">
                                {serviceHeader && serviceHeader.Title ? (
                                    serviceHeader.Title
                                ) : (
                                    <Skeleton count={2} className="w-75" />
                                )}
                            </h1>

                            {serviceHeader && serviceHeader.Description ? (
                                HTMLReactParser(serviceHeader.Description)
                            ) : (
                                <>
                                    <Skeleton count={4} className="w-10" />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="wave_icon py-4 py-md-5 mt-3">
                    <Waves />
                </div>
            </section>

            <section className={`py-5 ${style.repeated_section}`}>
                <div className="container -mb-5">
                    {serviceTopContent &&
                        serviceTopContent.length > 0 &&
                        serviceTopContent
                            .slice(0, serviceTopContent.length - 1)
                            .map((item, index) => {
                                return (
                                    <div
                                        key={item.id}
                                        className={`row align-items-center mb-5 ${style.row}`}
                                    >
                                        <div
                                            className={`col-md-6 py-3 ${style.content_column}`}
                                        >
                                            <h2>{item.Title}</h2>
                                            {HTMLReactParser(item.Description)}
                                            {item.Button && (
                                                <Link
                                                    className="btn btn-secondary btn-sm"
                                                    to={item.Button.URL}
                                                >
                                                    {item.Button.Title}
                                                </Link>
                                            )}
                                        </div>
                                        <div
                                            className={`col-md-6 py-3 ${style.img_column}`}
                                        >
                                            {item.Image && (
                                                <img
                                                    src={item.Image.url}
                                                    alt={
                                                        item.Image
                                                            .alternativeText
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                    {serviceTopContent &&
                        serviceTopContent.length > 0 &&
                        serviceTopContent
                            .slice(
                                serviceTopContent.length - 1,
                                serviceTopContent.length
                            )
                            .map((item, index) => {
                                return (
                                    <div
                                        key={item.id}
                                        className={`row justify-content-center flex-row mb-5 ${style.row}`}
                                    >
                                        <div
                                            className={`col-md-8 py-3 ${style.content_column}`}
                                        >
                                            <h2>{item.Title}</h2>
                                            {HTMLReactParser(item.Description)}
                                            {item.Button && (
                                                <Link
                                                    className="btn btn-secondary btn-sm"
                                                    to={item.Button.URL}
                                                >
                                                    {item.Button.Title}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                </div>
            </section>

            {serviceMiddleContent && (
                <section className="bg-green-light text-center py-5">
                    <div className="container py-3">
                        <div className="row">
                            <div className="col-sm-12 mx-auto max-w-800">
                                <div className="tools-in-process text-center">
                                    {serviceMiddleContent.HeaderMiddleContent
                                        .Title ? (
                                        <h2>
                                            {
                                                serviceMiddleContent
                                                    .HeaderMiddleContent.Title
                                            }
                                        </h2>
                                    ) : (
                                        <h2>
                                            <Skeleton className="w-25" />
                                        </h2>
                                    )}

                                    {serviceMiddleContent.length > 0 &&
                                        HTMLReactParser(
                                            serviceMiddleContent
                                                .HeaderMiddleContent
                                                .MiddleDescription
                                        )}

                                    <h4>Design Tools</h4>
                                    <ul>
                                        <li>
                                            <img
                                                alt="Adobe Xd"
                                                loading="lazy"
                                                src="https://princepal-media.s3.ap-south-1.amazonaws.com/photo/upload/adobe-Xd-icon-16052023.png"
                                                width="62"
                                                height="62"
                                            />
                                            Adobe Xd
                                        </li>
                                        <li>
                                            <img
                                                alt="Photoshop"
                                                loading="lazy"
                                                src="https://princepal-media.s3.ap-south-1.amazonaws.com/photo/upload/photoshop-icon-16052023.png"
                                                width="62"
                                                height="62"
                                            />
                                            Photoshop
                                        </li>
                                        <li>
                                            <img
                                                alt="Illustrator"
                                                loading="lazy"
                                                src="https://princepal-media.s3.ap-south-1.amazonaws.com/photo/upload/illustrator-icon-16052023.png"
                                                width="62"
                                                height="62"
                                            />
                                            Illustrator
                                        </li>
                                        <li>
                                            <img
                                                alt="Figma"
                                                loading="lazy"
                                                src="https://princepal-media.s3.ap-south-1.amazonaws.com/photo/upload/figma-icon-16052023.png"
                                                width="62"
                                                height="62"
                                            />
                                            Figma
                                        </li>
                                        <li>
                                            <img
                                                alt="After effects"
                                                loading="lazy"
                                                src="https://princepal-media.s3.ap-south-1.amazonaws.com/photo/upload/after-effects-icon-16052023.png"
                                                width="62"
                                                height="62"
                                            />
                                            After Effects
                                        </li>
                                        <li>
                                            <img
                                                alt="Invision"
                                                loading="lazy"
                                                src="https://princepal-media.s3.ap-south-1.amazonaws.com/photo/upload/invision-icon-16052023.png"
                                                width="62"
                                                height="62"
                                            />
                                            Invision
                                        </li>
                                        <li>
                                            <img
                                                alt="Miro"
                                                loading="lazy"
                                                src="https://princepal-media.s3.ap-south-1.amazonaws.com/photo/upload/miro-icon-16052023.png"
                                                width="62"
                                                height="62"
                                            />
                                            Miro
                                        </li>
                                        <li>
                                            <img
                                                alt="Axure"
                                                loading="lazy"
                                                src="https://princepal-media.s3.ap-south-1.amazonaws.com/photo/upload/axure-icon-16052023.png"
                                                width="62"
                                                height="62"
                                            />
                                            Axure
                                        </li>
                                        <li>
                                            <img
                                                alt="Paper Prototyping"
                                                loading="lazy"
                                                src="https://princepal-media.s3.ap-south-1.amazonaws.com/photo/upload/paper-prototyping-icon-16052023.png"
                                                width="62"
                                                height="62"
                                            />
                                            Paper Prototyping
                                        </li>
                                    </ul>
                                    <h4>Project Management Tools</h4>
                                    <ul>
                                        <li>
                                            <img
                                                alt="Jira"
                                                loading="lazy"
                                                src="https://princepal-media.s3.ap-south-1.amazonaws.com/photo/upload/jira-icon-16052023.png"
                                                width="62"
                                                height="62"
                                            />
                                            Jira
                                        </li>
                                        <li>
                                            <img
                                                alt="ClickUp"
                                                loading="lazy"
                                                src="https://princepal-media.s3.ap-south-1.amazonaws.com/photo/upload/clickup-icon-16052023.png"
                                                width="62"
                                                height="62"
                                            />
                                            ClickUp
                                        </li>
                                        <li>
                                            <img
                                                alt="Monday"
                                                loading="lazy"
                                                src="https://princepal-media.s3.ap-south-1.amazonaws.com/photo/upload/monday-icon-16052023.png"
                                                width="62"
                                                height="62"
                                            />
                                            Monday
                                        </li>
                                        <li>
                                            <img
                                                alt="Asana"
                                                loading="lazy"
                                                src="https://princepal-media.s3.ap-south-1.amazonaws.com/photo/upload/asana-icon-16052023.png"
                                                width="62"
                                                height="62"
                                            />
                                            Asana
                                        </li>
                                        <li>
                                            <img
                                                alt="Azure DevOps"
                                                loading="lazy"
                                                src="https://princepal-media.s3.ap-south-1.amazonaws.com/photo/upload/azure-dev-ops-icon-16052023.png"
                                                width="62"
                                                height="62"
                                            />
                                            Azure DevOps
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <section className={`py-5 ${style.repeated_section}`}>
                <div className="container -mb-5">
                    {serviceBottomContent &&
                        serviceBottomContent.length > 0 &&
                        serviceBottomContent.map((item, index) => {
                            return (
                                <div
                                    key={item.id}
                                    className={`row align-items-center mb-5 ${style.row}`}
                                >
                                    <div
                                        className={`col-md-6 py-3 ${style.content_column}`}
                                    >
                                        <h2>{item.Title}</h2>
                                        {HTMLReactParser(item.Description)}
                                        {item.Button && (
                                            <Link
                                                className="btn btn-secondary btn-sm"
                                                to={item.Button.URL}
                                            >
                                                {item.Button.Title}
                                            </Link>
                                        )}
                                    </div>
                                    <div
                                        className={`col-md-6 py-3 ${style.img_column}`}
                                    >
                                        {item.Image && (
                                            <img
                                                src={item.Image.url}
                                                alt={item.Image.alternativeText}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </section>

            <Testimonials />

            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 fw-bold text-center mb-4">
                            <h2 className="mb-4">
                                {faqData && faqData.Heading ? (
                                    faqData.Heading
                                ) : (
                                    <div className="col-sm-8 mx-auto">
                                        <Skeleton />
                                    </div>
                                )}
                            </h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                            {faqData &&
                            faqData.QuestionAnswers &&
                            faqData.QuestionAnswers.length > 0 ? (
                                <Accordion
                                    // defaultActiveKey={activeTab}
                                    className={`${styleAccordian.accordian}`}
                                >
                                    {faqData.QuestionAnswers.map(
                                        (accordian, index) => {
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
                                        }
                                    )}
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

export default Services;
