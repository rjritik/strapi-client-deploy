import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./blogSlice";
import axios from "axios";
import config from "../config";

const headerSlice = createSlice({
    name: "header",
    initialState: {
        logoData: null,
        menuItemData: [],
        socialIconData: [],
        themeData: [],
        theme: "",
        status: STATUS.IDLE,
    },
    reducers: {
        setLogoData(state, action) {
            state.logoData = action.payload;
        },
        setMenuItemData(state, action) {
            state.menuItemData = action.payload;
        },
        setSocialIconData(state, action) {
            state.socialIconData = action.payload;
        },
        setThemeData(state, action) {
            state.themeData = action.payload;
        },
        setTheme(state, action) {
            state.theme = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const {
    setLogoData,
    setMenuItemData,
    setSocialIconData,
    setThemeData,
    setTheme,
    setStatus,
} = headerSlice.actions;
export default headerSlice.reducer;

export function getHeaderData() {
    return async function getHeaderDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const headerAPI = await axios.get(
                `${config.BACKEND_URL}/api/header?populate[Header][populate]=*`
            );

            dispatch(setLogoData(headerAPI.data.data.Header.Logo));
            dispatch(setMenuItemData(headerAPI.data.data.Header.MenuItem));
            dispatch(setSocialIconData(headerAPI.data.data.Header.SocialIcon));
            dispatch(setThemeData(headerAPI.data.data.Header.Theme));
            dispatch(setTheme());
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
