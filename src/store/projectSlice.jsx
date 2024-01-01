import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./blogSlice";
import axios from "axios";
import config from "../config";

const projectSlice = createSlice({
    name: "projects",
    initialState: {
        projectHeader: null,
        projectSeo: null,
        allProjects: [],
        projectCategory: [],
        relatedProjects: [],
        status: STATUS.IDLE,
    },
    reducers: {
        setProjectHeader(state, action) {
            state.projectHeader = action.payload;
        },
        setProjectSeo(state, action) {
            state.projectSeo = action.payload;
        },
        setAllProjects(state, action) {
            state.allProjects = action.payload;
        },
        setProjectCategory(state, action) {
            state.projectCategory = action.payload;
        },
        setRelatedProjects(state, action) {
            state.relatedProjects = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const {
    setProjectHeader,
    setProjectSeo,
    setAllProjects,
    setProjectCategory,
    setRelatedProjects,
    setStatus,
} = projectSlice.actions;
export default projectSlice.reducer;

export function getProjectHeader() {
    return async function getProjectHeaderThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const projectHeaderAPI = await axios.get(
                `${config.BACKEND_URL}/api/project-header?populate=*`
            );

            dispatch(setProjectHeader(projectHeaderAPI.data.data.Header));
            dispatch(setProjectSeo(projectHeaderAPI.data.data.SEO));
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getAllProjects(categoryName = "All") {
    return async function getAllProjectsThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            if (categoryName !== "All") {
                const ProjectFilterCategoryAPI = await axios.get(
                    `${config.BACKEND_URL}/api/project-categories?populate[0]=Category.ProjectThumbnail&filters[CategoryName][$eq]=${categoryName}`
                );
                dispatch(
                    setAllProjects(
                        ProjectFilterCategoryAPI.data.data[0].Category
                    )
                );
            } else {
                const allProjectsAPI = await axios.get(
                    `${config.BACKEND_URL}/api/saas-projects?populate=*`
                );
                dispatch(setAllProjects(allProjectsAPI.data.data));
            }

            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getProjectCategory() {
    return async function getProjectCategoryThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const ProjectCategoryAPI = await axios.get(
                `${config.BACKEND_URL}/api/project-categories?populate=*`
            );
            dispatch(setProjectCategory(ProjectCategoryAPI.data.data));
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getRelatedProjects(projectCategory) {
    return async function getRelatedProjectsThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const RelatedProjectsAPI = await axios.get(
                `${config.BACKEND_URL}/api/project-categories?populate[0]=Category.ProjectThumbnail&filters[CategoryName][$eq]=${projectCategory}`
            );
            dispatch(
                setRelatedProjects(RelatedProjectsAPI.data.data[0].Category)
            );
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
