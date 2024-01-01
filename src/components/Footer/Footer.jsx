import React, { useEffect } from "react";
import style from "./Footer.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Card, Nav } from "react-bootstrap";
import Icons, { iconMapFunction } from "./../Utilities/Icons/Icons";
import parser from "html-react-parser";
import { imagePlaceholder } from "./../Utilities/ImagePlaceholder/ImagePlaceholder";
import { postURL } from "../Utilities/PostURL/PostUrl";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { getFooterData } from "../../store/footerSlice";
import { getAllPost } from "../../store/blogSlice";
// import { getBlogData } from "../../store/blogSlice";

const Footer = () => {
    const navigate = useNavigate();

    const postURLFunction = async (posturl, type) => {
        const apiResponse = await postURL(posturl, type);
        navigate(`/blog/${apiResponse.data.data[0].PostURL}`, {
            state: apiResponse.data.data[0],
        });
    };

    const dispatch = useDispatch();
    const {
        topFooterData,
        aboutFooterData,
        socialIconsFooter,
        quickLinksFooterData,
        quickLinksMenuFooterData,
        uxResourcesFooterData,
        uxResourcesMenuFooterData,
        bottomFooterData,
        bottomFooterMenu,
        articlesFooterData,
    } = useSelector((state) => state.footer);

    useEffect(() => {
        setTimeout(() => {
            if (
                topFooterData === null ||
                !aboutFooterData.length > 0 ||
                !socialIconsFooter.length > 0 ||
                quickLinksFooterData === null ||
                !quickLinksMenuFooterData.length > 0 ||
                uxResourcesFooterData === null ||
                !uxResourcesMenuFooterData.length > 0 ||
                bottomFooterData === null ||
                !bottomFooterMenu.length > 0 ||
                articlesFooterData === null
            ) {
                dispatch(getFooterData());
            }
        }, 625);
    }, []);

    const { allPost: blogFooterData, status } = useSelector(
        (state) => state.blog
    );

    useEffect(() => {
        setTimeout(() => {
            if (!blogFooterData.length > 0) {
                dispatch(getAllPost());
            }
        }, 625);
    }, []);

    return (
        <>
            <footer
                className={`bg-primary py-4 py-md-5 transition ${style.footer}`}
            >
                <div className="container">
                    {/* footer top */}
                    <div className={`py-3 py-md-4 ${style.top_footer}`}>
                        {topFooterData && topFooterData.Title !== null ? (
                            <Link
                                className={`font-heading display-2 fw-bold mb-3 ${style.big_font}`}
                                to={topFooterData.TitleURL}
                            >
                                {topFooterData.Title}
                            </Link>
                        ) : (
                            <div className="display-2 mb-5 w-25">
                                <Skeleton className="opacity-75" />
                            </div>
                        )}
                        {topFooterData && topFooterData.Description !== null ? (
                            parser(`${topFooterData.Description}`)
                        ) : (
                            <Skeleton className="col-sm-5 opacity-75" />
                        )}
                    </div>

                    {/* footer about */}
                    <div className={`py-3 py-md-4 ${style.middle_footer}`}>
                        <div className="row">
                            <div className="col-md-12 col-lg-4 my-3 my-md-4">
                                {aboutFooterData.Title &&
                                aboutFooterData.Title !== null ? (
                                    <h5 className="font-body text-white fw-medium">
                                        {aboutFooterData.Title}
                                    </h5>
                                ) : (
                                    <h5 className="font-body text-white fw-medium">
                                        <Skeleton className="py-1 w-50 opacity-75" />
                                    </h5>
                                )}
                                {aboutFooterData.Description &&
                                aboutFooterData.Description !== null ? (
                                    parser(`${aboutFooterData.Description}`)
                                ) : (
                                    <>
                                        <Skeleton className="opacity-75" />
                                        <Skeleton className="w-75 opacity-75" />
                                    </>
                                )}
                                <div
                                    className={`mt-4 -me-3 -mb-3 d-flex felx-wrap ${style.social_icons_wrapper}`}
                                >
                                    {socialIconsFooter &&
                                    socialIconsFooter.length > 0 ? (
                                        socialIconsFooter.map((icon, index) => {
                                            const iconData = iconMapFunction(
                                                icon.Icon
                                            );
                                            return (
                                                <Link
                                                    key={icon.id}
                                                    className="me-3 mb-3"
                                                    to={icon.Link}
                                                    target="_blank"
                                                >
                                                    <Icons
                                                        family={iconData}
                                                        name={icon.Icon}
                                                    />
                                                </Link>
                                            );
                                        })
                                    ) : (
                                        <>
                                            <span
                                                className="me-3 mb-3 ratio ratio-1x1"
                                                style={{ maxWidth: "40px" }}
                                            >
                                                <Skeleton className="w-100 h-100 rounded-circle opacity-75" />
                                            </span>
                                            <span
                                                className="me-3 mb-3 ratio ratio-1x1"
                                                style={{ maxWidth: "40px" }}
                                            >
                                                <Skeleton className="w-100 h-100 rounded-circle opacity-75" />
                                            </span>
                                            <span
                                                className="me-3 mb-3 ratio ratio-1x1"
                                                style={{ maxWidth: "40px" }}
                                            >
                                                <Skeleton className="w-100 h-100 rounded-circle opacity-75" />
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* footer quick links */}
                            <div className="col-sm-6 col-md-3 col-lg-2 my-3 my-md-4">
                                {quickLinksFooterData &&
                                quickLinksFooterData.Heading !== null ? (
                                    <h5 className="font-body text-white fw-medium">
                                        {quickLinksFooterData.Heading}
                                    </h5>
                                ) : (
                                    <h5 className="font-body text-white fw-medium">
                                        <Skeleton className="py-1 w-100 opacity-75" />
                                    </h5>
                                )}
                                {quickLinksMenuFooterData &&
                                quickLinksMenuFooterData.length > 0 ? (
                                    <Nav className="d-block -mb-1">
                                        {quickLinksMenuFooterData.map(
                                            (menu, index) => {
                                                return (
                                                    <NavLink
                                                        key={menu.id}
                                                        className="nav-link d-table p-0 mb-1"
                                                        to={menu.LinkUrl}
                                                    >
                                                        {menu.LinkTag}
                                                    </NavLink>
                                                );
                                            }
                                        )}
                                    </Nav>
                                ) : (
                                    <div className="d-block -mb-1">
                                        <Skeleton
                                            className="mb-1 w-75 opacity-75"
                                            count={6}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* footer ux resources */}
                            <div className="col-sm-6 col-md-3 col-lg-2 my-3 my-md-4">
                                {uxResourcesFooterData &&
                                uxResourcesFooterData.Heading !== null ? (
                                    <h5 className="font-body text-white fw-medium">
                                        {uxResourcesFooterData.Heading}
                                    </h5>
                                ) : (
                                    <h5 className="font-body text-white fw-medium">
                                        <Skeleton className="py-1 w-100 opacity-75" />
                                    </h5>
                                )}
                                {uxResourcesMenuFooterData &&
                                uxResourcesMenuFooterData.length > 0 ? (
                                    <Nav className="d-block -mb-1">
                                        {uxResourcesMenuFooterData.map(
                                            (menu, index) => {
                                                return (
                                                    <NavLink
                                                        key={menu.id}
                                                        className="nav-link d-table p-0 mb-1"
                                                        to={menu.UXResourcesUrl}
                                                    >
                                                        {menu.UXResourceTag}
                                                    </NavLink>
                                                );
                                            }
                                        )}
                                    </Nav>
                                ) : (
                                    <div className="d-block -mb-1">
                                        <Skeleton
                                            className="mb-1 w-75 opacity-75"
                                            count={6}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* footer blog */}
                            <div className="col-md-6 col-lg-4 my-3 my-md-4">
                                {articlesFooterData &&
                                articlesFooterData.Title !== null ? (
                                    <h5 className="font-body text-white fw-medium">
                                        {articlesFooterData.Title}
                                    </h5>
                                ) : (
                                    <h5 className="font-body text-white fw-medium">
                                        <Skeleton className="py-1 w-50 opacity-75" />
                                    </h5>
                                )}

                                {blogFooterData && blogFooterData.length > 0 ? (
                                    <div
                                        className={`-mb-3 ${style.blog_list_wrapper}`}
                                    >
                                        {blogFooterData
                                            .slice(0, 2)
                                            .map((post, index) => {
                                                return (
                                                    <Card
                                                        key={post.id}
                                                        className={`bg-transparent border-0 mb-3 ${style.card}`}
                                                    >
                                                        <Card.Link
                                                            className={`d-flex cursor-pointer ${style.card_link}`}
                                                            onClick={
                                                                (e) =>
                                                                    postURLFunction(
                                                                        post.PostURL,
                                                                        "blogs"
                                                                    ) // slug, type
                                                            }
                                                        >
                                                            <Card.Img
                                                                className={`flex-shrink-1 mt-1 ${style.card_img}`}
                                                                src={
                                                                    post.BlogThumbnail ===
                                                                    null
                                                                        ? {
                                                                              imagePlaceholder,
                                                                          }
                                                                        : `${post.BlogThumbnail.formats.thumbnail.url}`
                                                                }
                                                                onError={
                                                                    imagePlaceholder
                                                                }
                                                            />
                                                            <Card.Body className="p-0 ps-3 m-0 w-100">
                                                                <Card.Title
                                                                    className={`font-body p-0 m-0 ${style.card_title}`}
                                                                >
                                                                    {post.Title}
                                                                </Card.Title>
                                                            </Card.Body>
                                                        </Card.Link>
                                                    </Card>
                                                );
                                            })}
                                    </div>
                                ) : (
                                    <div
                                        className={`-mb-3 ${style.blog_list_wrapper}`}
                                    >
                                        <Card
                                            className={`bg-transparent border-0 mb-3 ${style.card}`}
                                        >
                                            <Card.Link className="d-flex pe-none">
                                                <div
                                                    className={`flex-shrink-1 ${style.card_img}`}
                                                >
                                                    <Skeleton className="w-100 h-100 ratio111 ratio-4x333 opacity-75" />
                                                </div>
                                                <Card.Body className="p-0 ps-3 m-0 w-100">
                                                    <Skeleton className="opacity-75" />
                                                    <Skeleton className="w-75 opacity-75" />
                                                </Card.Body>
                                            </Card.Link>
                                        </Card>
                                        <Card
                                            className={`bg-transparent border-0 mb-3 ${style.card}`}
                                        >
                                            <Card.Link className="d-flex pe-none">
                                                <div
                                                    className={`flex-shrink-1 ${style.card_img}`}
                                                >
                                                    <Skeleton className="w-100 h-100 ratio111 ratio-4x333 opacity-75" />
                                                </div>
                                                <Card.Body className="p-0 ps-3 m-0 w-100">
                                                    <Skeleton className="opacity-75" />
                                                    <Skeleton className="w-75 opacity-75" />
                                                </Card.Body>
                                            </Card.Link>
                                        </Card>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* footer copyright */}
                    {bottomFooterData && bottomFooterData.Copyright !== null ? (
                        <div
                            className={`py-3 py-md-4 overflow-hidden ${style.bottom_footer}`}
                        >
                            <Nav className="-mb-1 -me-5">
                                <span
                                    className={`p-0 mb-1 me-5 ${style.copyright}`}
                                >
                                    {bottomFooterData.Copyright}
                                </span>
                                {bottomFooterMenu.map((menu, index) => {
                                    return (
                                        <NavLink
                                            key={menu.id}
                                            className="nav-link p-0 mb-1 me-5"
                                            to={menu.MenuLink}
                                        >
                                            {menu.MenuTitle}
                                        </NavLink>
                                    );
                                })}
                            </Nav>
                        </div>
                    ) : (
                        <div className="py-3 py-md-4 w-100">
                            <Nav className="-mb-1 -me-5">
                                <span className="p-0 mb-1 me-5">
                                    <Skeleton className="px-5 opacity-75" />
                                </span>
                                <span className="p-0 mb-1 me-5">
                                    <Skeleton className="px-5 opacity-75" />
                                </span>
                            </Nav>
                        </div>
                    )}
                </div>
            </footer>
        </>
    );
};

export default Footer;
