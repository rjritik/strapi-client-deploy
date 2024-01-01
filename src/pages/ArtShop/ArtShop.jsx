import React, { useEffect, useState } from "react";
import Head from "../../components/Utilities/Head/Head";
import { useDispatch, useSelector } from "react-redux";
import { getArtshopData } from "../../store/artshopSlice";
import Waves from "../../components/Utilities/Svg/Waves";
import Skeleton from "react-loading-skeleton";
import HTMLReactParser from "html-react-parser";
import { Link } from "react-router-dom";
import style from "./ArtShop.module.css";
import { Modal } from "react-bootstrap";

const ArtShop = () => {
    const [show, setShow] = useState({
        title: null,
        image: null,
        btnName: null,
        btnURL: null,
        display: false,
    });

    const handleClose = () => setShow(false);
    const handleShow = (popupImage, popupTitle, buttonName, buttonURL) => {
        setShow({
            title: popupTitle,
            image: popupImage,
            btnName: buttonName,
            btnURL: buttonURL,
            display: true,
        });
    };

    const dispatch = useDispatch();
    const {
        header,
        portfolioButton,
        priceSection,
        priceIframe,
        buySection,
        status,
    } = useSelector((state) => state.artshop);

    useEffect(() => {
        setTimeout(() => {
            if (
                header === null ||
                portfolioButton === null ||
                !priceSection.length > 0 ||
                priceIframe === null ||
                !buySection.length > 0
            ) {
                dispatch(getArtshopData());
            }
        }, 625);
    }, []);

    return (
        <>
            <Head seoTitle="ArtShop" />

            <section className="bg-gray3 pt-5 position-relative">
                <div className="container py-3">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 text-center mb-4">
                            <h1 className="mb-4">
                                {header ? (
                                    header.Title
                                ) : (
                                    <Skeleton className="mb-3 w-75" />
                                )}
                            </h1>

                            {header ? (
                                HTMLReactParser(header.Description)
                            ) : (
                                <>
                                    <Skeleton className="mb-3 w-75" />
                                    <Skeleton className="w-50" />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="wave_icon py-4 py-md-5 mt-3">
                    <Waves />
                </div>
            </section>

            {priceIframe && (
                <section className="pt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 mx-auto">
                                {HTMLReactParser(priceIframe)}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {buySection && (
                <section className="py-5">
                    <div className="container">
                        <div className={`row ${style.masonry_grid}`}>
                            {buySection.length > 0 ? (
                                buySection.map((item, index) => {
                                    return (
                                        <div
                                            key={item.id}
                                            className="col-sm-12 mb-4"
                                        >
                                            <div className="bg-white overflow-hidden rounded-3 shadow">
                                                <figure className="mb-0">
                                                    <img
                                                        className="w-100 h-auto"
                                                        onClick={(e) =>
                                                            handleShow(
                                                                item.PopupImageURL,
                                                                item.Title,
                                                                item.ButtonName,
                                                                item.ButtonURL
                                                            )
                                                        }
                                                        src={item.ImageURL}
                                                        alt={item.Title}
                                                    />
                                                </figure>
                                                <div className="d-flex d-flex p-3 align-items-start p-3">
                                                    <div className="pe-3 w-100">
                                                        {item.Title}
                                                    </div>
                                                    <Link
                                                        className="btn btn-outline-primary btn-sm flex-shrink-1 px-3 py-1 rounded-2"
                                                        to={item.ButtonURL}
                                                        target="_blank"
                                                    >
                                                        {item.ButtonName}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <>
                                    <Skeleton
                                        className="mb-4"
                                        style={{ height: "270px" }}
                                    />
                                    <Skeleton
                                        className="mb-4"
                                        style={{ height: "180px" }}
                                    />
                                    <Skeleton
                                        className="mb-4"
                                        style={{ height: "150px" }}
                                    />
                                    <Skeleton
                                        className="mb-4"
                                        style={{ height: "120px" }}
                                    />
                                    <Skeleton
                                        className="mb-4"
                                        style={{ height: "150px" }}
                                    />
                                    <Skeleton
                                        className="mb-4"
                                        style={{ height: "200px" }}
                                    />
                                    <Skeleton
                                        className="mb-4"
                                        style={{ height: "250px" }}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </section>
            )}

            <Modal
                show={show.display}
                onHide={handleClose}
                size="lg"
                centered
                className={style.buy_modal}
            >
                <Modal.Header
                    className="p-0 border-0"
                    closeButton
                ></Modal.Header>
                <Modal.Body className="p-0 border-0">
                    <img
                        className={`mb-0 ${style.popup_img}`}
                        src={show.image}
                        alt=""
                    />
                    <div className="d-flex d-flex mt-3 align-items-start">
                        <div className="pe-3 w-100">{show.title}</div>
                        <Link
                            className="btn btn-white btn-sm flex-shrink-1 px-3 py-1 rounded-2"
                            to={show.btnURL}
                            target="_blank"
                        >
                            {show.btnName}
                        </Link>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ArtShop;
