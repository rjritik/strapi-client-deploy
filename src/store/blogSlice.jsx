import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

export const STATUS = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",
});

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        homeBlogHeader: null,
        blogHeader: null,
        allPost: [],

        postCategory: [],
        postCategoryName: [],
        postCategoryHeader: [],
        relatedPost: [],
        status: STATUS.IDLE,
    },
    reducers: {
        setHomeBlogHeader(state, action) {
            state.homeBlogHeader = action.payload;
        },
        setBlogHeader(state, action) {
            state.blogHeader = action.payload;
        },

        setAllPost(state, action) {
            state.allPost = action.payload;
        },

        setPostCategory(state, action) {
            state.postCategory = action.payload;
        },
        setPostCategoryName(state, action) {
            state.postCategoryName = action.payload;
        },
        setRelatedPost(state, action) {
            state.relatedPost = action.payload;
        },
        setPostCategoryHeader(state, action) {
            state.postCategoryHeader = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const {
    setHomeBlogHeader,
    setBlogHeader,
    setAllPost,
    setPostCategory,
    setRelatedPost,
    setPostCategoryName,
    setPostCategoryHeader,
    setStatus,
} = blogSlice.actions;
export default blogSlice.reducer;

export function getHomeBlogHeader() {
    return async function getHomeBlogHeaderThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const homeBlogHeaderAPI = await axios.get(
                `${config.BACKEND_URL}/api/home-new?populate[HomeBlogHeader][populate]=*`
            );
            dispatch(
                setHomeBlogHeader(homeBlogHeaderAPI.data.data.HomeBlogHeader)
            );
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getBlogHeader() {
    return async function getBlogHeaderThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const blogHeaderAPI = await axios.get(
                `${config.BACKEND_URL}/api/blog-header?populate=*`
            );
            dispatch(setBlogHeader(blogHeaderAPI.data.data.BlogHeader));
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getAllPost(categoryName = "All") {
    return async function getAllPostThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            if (categoryName === "All") {
                const allPostAPI = await axios.get(
                    `${config.BACKEND_URL}/api/blogs?populate=*&sort[0]=PostedDate:desc`
                    // `${config.BACKEND_URL}/api/blogs?populate=*`
                );
                dispatch(setAllPost(allPostAPI.data.data));
                dispatch(setStatus(STATUS.IDLE));
            } else {
                const ProjectFilterCategoryAPI = await axios.get(
                    `${config.BACKEND_URL}/api/blog-categories?populate[0]=blogs.BlogThumbnail&filters[CategoryName][$eq]=${categoryName}`
                );
                dispatch(
                    setAllPost(ProjectFilterCategoryAPI.data.data[0].blogs)
                );
                dispatch(setStatus(STATUS.IDLE));
            }
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getPostCategory(index) {
    return async function getPostCategoryThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const postCategoryAPI = await axios.get(
                `${config.BACKEND_URL}/api/blog-categories?populate=*`
            );
            dispatch(setPostCategory(postCategoryAPI.data.data));
            dispatch(
                setPostCategoryName(postCategoryAPI.data.data.CategoryName)
            );
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getRelatedPost(postCategory) {
    return async function getRelatedPostThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const relatedPostAPI = await axios.get(
                `${config.BACKEND_URL}/api/blog-categories?populate[0]=blogs.BlogThumbnail&filters[CategoryName][$eq]=${postCategory}&sort[0]=PostedDate:desc`
            );
            dispatch(setRelatedPost(relatedPostAPI.data.data[0].blogs));
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
