import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./blogSlice";
import axios from "axios";
import config from "../config";

const footerSlice = createSlice({
    name: "footer",
    initialState: {
        topFooterData: null,
        aboutFooterData: [],
        socialIconsFooter: [],
        quickLinksFooterData: null,
        quickLinksMenuFooterData: [],
        uxResourcesFooterData: null,
        uxResourcesMenuFooterData: [],
        bottomFooterData: null,
        bottomFooterMenu: [],
        articlesFooterData: null,
        status: STATUS.IDLE,
    },
    reducers: {
        setTopFooterData(state, action) {
            state.topFooterData = action.payload;
        },
        setAboutFooterData(state, action) {
            state.aboutFooterData = action.payload;
        },
        setSocialIconsFooter(state, action) {
            state.socialIconsFooter = action.payload;
        },
        setQuickLinksFooterData(state, action) {
            state.quickLinksFooterData = action.payload;
        },
        setQuickLinksMenuFooterData(state, action) {
            state.quickLinksMenuFooterData = action.payload;
        },
        setUxResourcesFooterData(state, action) {
            state.uxResourcesFooterData = action.payload;
        },
        setUxResourcesMenuFooterData(state, action) {
            state.uxResourcesMenuFooterData = action.payload;
        },
        setBottomFooterData(state, action) {
            state.bottomFooterData = action.payload;
        },
        setBottomFooterMenu(state, action) {
            state.bottomFooterMenu = action.payload;
        },
        setarticlesFooterData(state, action) {
            state.articlesFooterData = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const {
    setTopFooterData,
    setAboutFooterData,
    setSocialIconsFooter,
    setQuickLinksFooterData,
    setQuickLinksMenuFooterData,
    setUxResourcesFooterData,
    setUxResourcesMenuFooterData,
    setBottomFooterData,
    setBottomFooterMenu,
    setarticlesFooterData,
    setStatus,
} = footerSlice.actions;
export default footerSlice.reducer;

export function getFooterData() {
    return async function getFooterDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const footerAPI = await axios.get(
                `${config.BACKEND_URL}/api/footer?populate[FooterAbout][populate]=*&populate[TopFooter][populate]=*&populate[BottomFooter][populate]=*&populate[QuickLinks][populate]=*&populate[UxResources][populate]=*&populate[FeaturedArticles][populate]=*`
            );

            dispatch(setTopFooterData(footerAPI.data.data.TopFooter));
            dispatch(setAboutFooterData(footerAPI.data.data.FooterAbout));
            dispatch(
                setSocialIconsFooter(
                    footerAPI.data.data.FooterAbout.SocialIcons
                )
            );
            dispatch(setQuickLinksFooterData(footerAPI.data.data.QuickLinks));
            dispatch(
                setQuickLinksMenuFooterData(
                    footerAPI.data.data.QuickLinks.QuickLinks
                )
            );
            dispatch(setUxResourcesFooterData(footerAPI.data.data.UxResources));
            dispatch(
                setUxResourcesMenuFooterData(
                    footerAPI.data.data.UxResources.UxResources
                )
            );
            dispatch(setBottomFooterData(footerAPI.data.data.BottomFooter));
            dispatch(
                setBottomFooterMenu(footerAPI.data.data.BottomFooter.menu)
            );
            dispatch(
                setarticlesFooterData(footerAPI.data.data.FeaturedArticles)
            );
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
