import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./blogSlice";
import axios from "axios";
import config from "../config";

const contactSlice = createSlice({
    name: "contact",
    initialState: {
        contactData: null,
        status: STATUS.IDLE,
    },
    reducers: {
        setContactData(state, action) {
            state.contactData = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setContactData, setStatus } = contactSlice.actions;
export default contactSlice.reducer;

export function getContactData() {
    return async function getContactDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const contactAPI = await axios.get(
                `${config.BACKEND_URL}/api/contact?populate[0]=AchievementsToShow.Items`
            );

            dispatch(setContactData(contactAPI.data.data));
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
