import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./blogSlice";
import axios from "axios";
import config from "../config";

const aboutSlice = createSlice({
    name: "about",
    initialState: {
        aboutHeader: null,
        aboutContent: null,
        aboutSeo: {},
        status: STATUS.IDLE,
    },
    reducers: {
        setAboutHeader(state, action) {
            state.aboutHeader = action.payload;
        },
        setAboutContent(state, action) {
            state.aboutContent = action.payload;
        },
        setAboutSeo(state, action) {
            state.aboutSeo = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setAboutHeader, setAboutContent, setAboutSeo, setStatus } =
    aboutSlice.actions;
export default aboutSlice.reducer;

export function getAboutData() {
    return async function getAboutDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const aboutAPI = await axios.get(
                `${config.BACKEND_URL}/api/about?populate=*`
            );
            dispatch(setAboutHeader(aboutAPI.data.data.AboutHeader));
            dispatch(setAboutContent(aboutAPI.data.data.AboutContent));
            dispatch(setAboutSeo(aboutAPI.data.data.SEO));
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
