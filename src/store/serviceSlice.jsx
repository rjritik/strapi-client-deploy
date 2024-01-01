import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./blogSlice";
import axios from "axios";
import config from "../config";

const serviceSlice = createSlice({
    name: "service",
    initialState: {
        serviceHeader: null,
        serviceTopContent: [],
        serviceMiddleContent: null,
        serviceBottomContent: [],
        faqData: null,
        status: STATUS.IDLE,
    },
    reducers: {
        setServiceHeader(state, action) {
            state.serviceHeader = action.payload;
        },
        setServiceTopContent(state, action) {
            state.serviceTopContent = action.payload;
        },
        setServiceMiddleContent(state, action) {
            state.serviceMiddleContent = action.payload;
        },
        setServiceBottomContent(state, action) {
            state.serviceBottomContent = action.payload;
        },
        setFaqData(state, action) {
            state.faqData = action.payload;
        },

        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const {
    setServiceHeader,
    setServiceTopContent,
    setServiceMiddleContent,
    setServiceBottomContent,
    setFaqData,
    setStatus,
} = serviceSlice.actions;
export default serviceSlice.reducer;

export function getServiceData() {
    return async function getServiceDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const serviceAPI = await axios.get(
                `${config.BACKEND_URL}/api/service?populate[0]=ServiceHeader&populate[1]=ServiceTopContent.Image&populate[2]=ServiceTopContent.Button&populate[3]=middleContent&populate[4]=middleContent.HeaderMiddleContent&populate[5]=BottomContentSection.Image&populate[6]=FAQ&populate[7]=FAQ.QuestionAnswers`
            );

            dispatch(setServiceHeader(serviceAPI.data.data.ServiceHeader));
            dispatch(
                setServiceTopContent(serviceAPI.data.data.ServiceTopContent)
            );
            dispatch(
                setServiceMiddleContent(serviceAPI.data.data.middleContent)
            );
            dispatch(
                setServiceBottomContent(
                    serviceAPI.data.data.BottomContentSection
                )
            );
            dispatch(setFaqData(serviceAPI.data.data.FAQ));

            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
