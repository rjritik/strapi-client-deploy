import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./blogSlice";
import axios from "axios";
import config from "../config";

const policySlice = createSlice({
    name: "policy",
    initialState: {
        data: {},
        status: STATUS.IDLE,
    },
    reducers: {
        setData(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setData, setStatus } = policySlice.actions;
export default policySlice.reducer;

export function getPrivacyPolicy() {
    return async function getPrivacyPolicyThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const privacyPolicyAPI = await axios.get(
                `${config.BACKEND_URL}/api/privacy-policy?populate=*`
            );
            dispatch(setData(privacyPolicyAPI.data.data));
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
