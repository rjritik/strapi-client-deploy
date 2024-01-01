import React, { useDeferredValue, useRef, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import BlogItems from "./BlogItems";
import Icons from "../Utilities/Icons/Icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getBlogHeader,
    getPostCategory,
    getAllPost,
} from "../../store/blogSlice";
import style from "./../../pages/Blog/Blog.module.css";

const BlogPaginatedItems = ({ itemsPerPage, getCategoryHeader }) => {
    const initPage = useRef(false);
    const [itemOffset, setItemOffset] = useState(0);
    const [searchPost, setSearchPost] = useState([]);

    const [categoryName, setCategoryName] = useState("All");
    const [currentPage, setCurrentPage] = useState(0);

    const [query, setQuery] = useState("");
    const diffQuery = useDeferredValue(query);

    // for all posts
    const dispatch = useDispatch();
    const { allPost } = useSelector((state) => state.blog);
    const { postCategory } = useSelector((state) => state.blog);

    useEffect(() => {
        if (!allPost.length > 0) {
            dispatch(getAllPost());
        }
    }, []);
    useEffect(() => {
        if (!postCategory.length > 0) {
            dispatch(getPostCategory());
        }
    }, []);

    const { blogHeader } = useSelector((state) => state.blog);

    useEffect(() => {
        setTimeout(() => {
            if (blogHeader === null) {
                dispatch(getBlogHeader());
            }
        }, 625);
    }, []);

    useEffect(() => {
        if (blogHeader) getCategoryHeader(blogHeader);
    }, [blogHeader]);

    useEffect(() => {
        setTimeout(async () => {
            if (initPage.current === false) {
                dispatch(getPostCategory());
            }
            // getAllPost();
        }, 625);
    }, [categoryName]);

    useEffect(() => {
        setSearchPost(
            allPost.filter((post) => {
                initPage.current = true;
                if (query === "") {
                    return post;
                } else if (
                    post.Title.toLowerCase().includes(query.toLowerCase())
                ) {
                    return post;
                }
            })
        );
        setItemOffset(0);
        setCurrentPage(0);
    }, [allPost, diffQuery]);

    const handlecategory = async (e, category) => {
        setCategoryName(e.target.text);
        if (e.target.text !== "All") {
            getCategoryHeader(category.Header);
            dispatch(getAllPost(e.target.text));
        } else {
            getCategoryHeader(blogHeader);
            dispatch(getAllPost());
        }
    };

    const endOffset = itemOffset + itemsPerPage;

    const currentItems = searchPost.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(searchPost.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % searchPost.length;
        setItemOffset(newOffset);
        setCurrentPage(event.selected);
    };

    return (
        <>
            <div className="row">
                <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 mx-auto mb-4 mb-md-5">
                    <div className="form-group search-field position-relative">
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search"
                            className="form-control fs-base pe-5 w-100"
                        />
                        <span className="text-body d-flex flex-wrap justify-content-center align-content-center mx-2 opacity-25 position-absolute top-50 end-0 translate-middle-y">
                            <Icons family="FaReactIcons" name="FaSearch" />
                        </span>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 text-center">
                    <h4 className="mb-4">Category</h4>
                    <ul
                        className={`list-unstyled d-flex flex-wrap justify-content-center ${style.blog_categories}`}
                    >
                        <li className="d-flex flex-wrap mx-2 mb-3">
                            <Link
                                className={`bg-gray4 px-3 py-2 rounded-2 ${
                                    categoryName === "All"
                                        ? "clicked"
                                        : "not-selected111"
                                }`}
                                onClick={(e) => handlecategory(e)}
                            >
                                All
                            </Link>
                        </li>
                        {postCategory &&
                            postCategory.length > 0 &&
                            postCategory.map((category) => {
                                return (
                                    <li
                                        key={category.id}
                                        className="d-flex flex-wrap mx-2 mb-3"
                                    >
                                        <Link
                                            className={`bg-gray4 px-3 py-2 rounded-2 ${
                                                categoryName ===
                                                category.CategoryName
                                                    ? "clicked"
                                                    : "not-selected111"
                                            }`}
                                            onClick={(e) =>
                                                handlecategory(e, category)
                                            }
                                        >
                                            {category.CategoryName}
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>

            <BlogItems currentItems={currentItems} initPage={initPage} />

            {allPost.length > itemsPerPage && (
                <ReactPaginate
                    className="pagination"
                    breakLabel="..."
                    nextLabel={
                        <span className="btn btn-primary btn-min-w mx-2">
                            <span className="d-flex justify-content-center align-items-center">
                                Next &nbsp;
                                <Icons
                                    family="BsReactIcons"
                                    name="BsArrowRight"
                                />
                            </span>
                        </span>
                    }
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    forcePage={currentPage}
                    previousLabel={
                        <span className="btn btn-primary btn-min-w mx-2">
                            <span className="d-flex justify-content-center align-items-center">
                                <Icons
                                    family="BsReactIcons"
                                    name="BsArrowLeft"
                                />{" "}
                                &nbsp; Previous
                            </span>
                        </span>
                    }
                    renderOnZeroPageCount={null}
                />
            )}
        </>
    );
};

export default BlogPaginatedItems;
