import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import parser from "html-react-parser";
import Head from "../../components/Utilities/Head/Head";
import Waves from "../../components/Utilities/Svg/Waves";
import style from "./BlogDetail.module.css";
import Skeleton from "react-loading-skeleton";
import config from "../../config";
import AuthorThumbnail from "../../assets/images/placeholder-thumbnail.png";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, getRelatedPost } from "../../store/blogSlice";
import { imagePlaceholder } from "../../components/Utilities/ImagePlaceholder/ImagePlaceholder";
import Icons from "../../components/Utilities/Icons/Icons";
import HTMLReactParser from "html-react-parser";
import { dateFormat } from "../../components/Utilities/Date/DateFormat";
import "bootstrap/dist/js/bootstrap.bundle";
import accordionStyle from "../../components/Utilities/Accordian/HtmlAccordian.module.css";
// import "../../../node_modules/bootstrap/js/dist/carousel";
// import "../../../node_modules/bootstrap/js/src/carousel";

import {
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { postURL } from "../../components/Utilities/PostURL/PostUrl";

const BlogDetail = () => {
  const [currentPost, setCurrentPost] = useState({});
  const [date, setDate] = useState("");
  const location = useLocation();
  const shareUrl = `${config.FRONTEND_URL}${location.pathname}`;

  const dispatch = useDispatch();
  const { relatedPost, allPost } = useSelector((state) => state.blog);

  const postURLFunction = async (posturl, type) => {
    const apiResponse = await postURL(posturl, type);
    setCurrentPost(apiResponse?.data.data ? apiResponse?.data.data[0] : {});
  };

  useEffect(() => {
    (async () => {
      const slug = location?.pathname.split("/");
      postURLFunction(slug[slug.length - 1], "blogs");
    })();
    if (!allPost.length > 0) {
      dispatch(getAllPost());
    }
  }, [location]);

  useEffect(() => {
    setDate(dateFormat(currentPost?.PostedDate));
    if (!relatedPost.length > 0) {
      if (currentPost?.id)
        dispatch(getRelatedPost(currentPost?.blog_categories[0].CategoryName));
    }
  }, [currentPost]);

  return (
    <>
      <Head seoContent={currentPost?.seo} seoTitle={currentPost?.Title} />

      <section className="bg-gray3 pt-5 position-relative">
        <div className="container py-3">
          <div className="row">
            <div className="col-sm-12 col-md-10 col-xl-9 text-center mx-auto mb-4">
              {currentPost &&
                currentPost.blog_categories &&
                currentPost.blog_categories.length > 0 && (
                  <div className="text-uppercase mb-3">
                    Category:{" "}
                    {currentPost.blog_categories.map((category, index) => {
                      return (
                        <span key={category.id}>
                          {index ? ", " : ""}
                          <Link
                            className="text-decoration-underline pe-none"
                            to="#"
                          >
                            {category.CategoryName}
                          </Link>
                        </span>
                      );
                    })}
                  </div>
                )}

              <h1 className="mb-5">
                {currentPost && currentPost.Title ? (
                  currentPost.Title
                ) : (
                  <Skeleton className="w-75" />
                )}
              </h1>
              <div className="">
                {currentPost && currentPost.users_permissions_user ? (
                  <figure
                    className={`d-table mx-auto ratio ratio-1x1 rounded-circle overflow-hidden ${style.profile_img}`}
                  >
                    <img
                      className="object-fit-cover rounded-circle"
                      src={currentPost.users_permissions_user.UserImage.url}
                      alt=""
                    />
                  </figure>
                ) : (
                  <figure
                    className={`d-table mx-auto ratio ratio-1x1 rounded-circle overflow-hidden ${style.profile_img}`}
                  >
                    <figure
                      className={`d-table mx-auto ratio ratio-1x1 rounded-circle overflow-hidden ${style.profile_img}`}
                    >
                      <img
                        className="object-fit-cover rounded-circle"
                        src={AuthorThumbnail}
                        alt=""
                      />
                    </figure>
                  </figure>
                )}
                <div className="fs-6">
                  {currentPost && currentPost.users_permissions_user && (
                    <>
                      <span className="fw-medium">Posted by:</span> {""}
                      <Link
                        className="text-uppercase text-decoration-underline pe-none"
                        to=""
                      >
                        {currentPost.users_permissions_user.username}
                      </Link>{" "}
                    </>
                  )}
                  {currentPost.users_permissions_user &&
                    currentPost.PostedDate && <span className="">| </span>}
                  {currentPost.PostedDate && (
                    <>
                      <span className="fw-medium">Posted date:</span> {date}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="wave_icon py-4 py-md-5 mt-3">
          <Waves />
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <img
                className="d-table mx-auto rounded-3"
                src={currentPost?.BlogThumbnail?.url}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 d-flex flex-wrap justify-content-center">
              <span className={`${style.share_title}`}>Share:</span>
              {/* <FacebookShareCount url={shareUrl} /> */}
              <FacebookShareButton
                url={shareUrl}
                style={{ backgroundColor: "#0965FE" }}
              >
                <FacebookIcon size={25} borderRadius={10} /> Share
              </FacebookShareButton>
              <TwitterShareButton
                url={shareUrl}
                title="Tweet"
                style={{ backgroundColor: "#000000" }}
              >
                <XIcon size={25} borderRadius={10} /> Tweet
              </TwitterShareButton>
              <LinkedinShareButton
                url={shareUrl}
                style={{ backgroundColor: "#0077B5" }}
              >
                <LinkedinIcon size={25} borderRadius={10} /> Share
              </LinkedinShareButton>
              <WhatsappShareButton
                url={shareUrl}
                style={{ backgroundColor: "#25D366" }}
              >
                <WhatsappIcon size={25} borderRadius={10} /> Share
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div
              className={`col-sm-12 col-md-1000 col-md-8 mx-auto ${style.post_content}`}
            >
              {parser(`${currentPost.BlogContent}`)}
            </div>
          </div>
          <div className="row mt-5">
            {currentPost.Tags && currentPost.Tags.length > 0 && (
              <div
                className={`col-sm-12 col-md-1000 d-flex flex-wrap mx-auto mb-2 ${style.post_tags}`}
              >
                <span className="me-2 mb-2">Tags:</span>
                {currentPost.Tags.map((tag) => {
                  return (
                    <span
                      key={tag.id}
                      className="btn btn-gray btn-sm px-3 me-2 mb-2 rounded-3"
                    >
                      {tag.TagTitle}
                    </span>
                    // <Link
                    //     key={tag.id}
                    //     className="btn btn-gray btn-sm px-3 me-2 mb-2 rounded-3"
                    //     to="#"
                    // >
                    //     {tag.TagTitle}
                    // </Link>
                  );
                })}
              </div>
            )}
            <div className="col-sm-12">Post views: 265</div>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="border overflow-hidden">
                <Tabs
                  defaultActiveKey="bio"
                  className={`mb-3 ${style.user_tabs}`}
                >
                  <Tab
                    className="user-img d-block opacity-100"
                    eventKey="author"
                    title="Author"
                  >
                    <figure
                      className={`d-table mx-auto mb-1 mb-sm-000 ratio ratio-1x1 rounded-circle overflow-hidden ${style.profile_img}`}
                    >
                      <img
                        src={currentPost?.users_permissions_user?.UserImage.url}
                        alt=""
                        className="object-fit-cover rounded-circle"
                      />
                    </figure>
                    <div className="d-flex flex-wrap justify-content-center -ms-1 -me-1">
                      {currentPost?.users_permissions_user?.UserSocialIcons.Icon?.map(
                        (icon) => {
                          return (
                            <Link
                              key={icon.id}
                              to={icon.Link}
                              target="_blank"
                              className="fs-small px-1"
                            >
                              <Icons family="FaReactIcons" name={icon.Icon} />
                            </Link>
                          );
                        }
                      )}
                    </div>
                  </Tab>
                  <Tab eventKey="bio" title="Bio">
                    <h5 className="font-body mb-2">
                      {currentPost?.users_permissions_user?.username}
                    </h5>
                    <div className="fs-small">
                      {currentPost?.users_permissions_user?.AboutUser
                        ? HTMLReactParser(
                            currentPost?.users_permissions_user?.AboutUser
                          )
                        : ""}
                    </div>
                  </Tab>
                  <Tab eventKey="latest-posts" title="Latest Posts">
                    <h5 className="font-body mb-2">
                      <Link to="/blog">
                        Latest posts by{" "}
                        {currentPost?.users_permissions_user?.username} (see
                        all)
                      </Link>
                    </h5>
                    <ul className="fs-h6 p-0 -mb-1 mx-0 mt-0">
                      {allPost.slice(0, 3).map((post) => {
                        const date = dateFormat(post.PostedDate);

                        return (
                          <li
                            key={post.id}
                            className="d-flex justify-content-between align-items-center mb-1"
                          >
                            <Link
                              className="text-decoration-underline text-truncate w-100"
                              to={`${config.FRONTEND_URL}/blog/${post.PostURL}`}
                            >
                              {post.Title}
                            </Link>
                            <span className="date fs-small fst-italic111 flex-shrink-1 ms-3 ms-md-5 text-nowrap">
                              {date}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedPost && relatedPost.length > 1 && (
        <section className="pb-5">
          <div className="container">
            <div className="row text-center mb-4">
              <div className="col-sm-12">
                <h2>Related Blogs</h2>
              </div>
            </div>
            <div className="row justify-content-center111 -mb-5">
              {relatedPost
                .filter((post) => post.Title !== currentPost?.Title)
                .slice(0, 3)
                .map((item, index) => {
                  return (
                    <div
                      key={item.id}
                      className={`col-md-4 mb-5 ${style.related_blog_item}`}
                    >
                      <Link
                        to={`${config.FRONTEND_URL}/blog/${item.PostURL}`}
                        className="d-block w-100 h-100"
                      >
                        <figure className="mb-0">
                          <img
                            className="w-100 object-fit-cover rounded-2"
                            src={item.BlogThumbnail.url}
                            onError={imagePlaceholder}
                            alt=""
                          />
                        </figure>
                        <h4 className="font-body fw-medium lh-body mt-3 mb-0 w-100">
                          {item.Title}
                        </h4>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/11.0.2/bootstrap-slider.min.js"></script> */}
    </>
  );
};

export default BlogDetail;
