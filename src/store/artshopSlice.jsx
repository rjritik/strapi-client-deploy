import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./blogSlice";
import axios from "axios";
import config from "../config";

const artshopSlice = createSlice({
    name: "artshop",
    initialState: {
        header: null,
        portfolioButton: null,
        priceSection: [],
        priceIframe: null,
        buySection: [],
        status: STATUS.IDLE,
    },
    reducers: {
        setHeader(state, action) {
            state.header = action.payload;
        },
        setPortfolioButton(state, action) {
            state.portfolioButton = action.payload;
        },
        setPriceSection(state, action) {
            state.priceSection = action.payload;
        },
        setPriceIframe(state, action) {
            state.priceIframe = action.payload;
        },
        setBuySection(state, action) {
            state.buySection = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const {
    setHeader,
    setPortfolioButton,
    setPriceSection,
    setPriceIframe,
    setBuySection,
    setStatus,
} = artshopSlice.actions;
export default artshopSlice.reducer;

export function getArtshopData() {
    return async function getArtshopDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const artshopAPI = await axios.get(
                `${config.BACKEND_URL}/api/art-shop?populate=*`
            );

            dispatch(setHeader(artshopAPI.data.data.Header));
            dispatch(setPortfolioButton(artshopAPI.data.data.PortfolioButton));
            dispatch(setPriceSection(artshopAPI.data.data.PriceSection));
            dispatch(setPriceIframe(artshopAPI.data.data.PriceSectionIframe));
            dispatch(setBuySection(artshopAPI.data.data.BuySection));
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
