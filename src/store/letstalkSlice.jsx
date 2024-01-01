import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./blogSlice";
import axios from "axios";
import config from "../config";

const letstalkSlice = createSlice({
    name: "letstalk",
    initialState: {
        formTitle: null,
        formDescription: null,
        formMultiItems: [],
        formImage: null,
        formButton: null,
        formField: [],
        status: STATUS.IDLE,
    },
    reducers: {
        setFormTitle(state, action) {
            state.formTitle = action.payload;
        },
        setFormDescription(state, action) {
            state.formDescription = action.payload;
        },
        setFormMultiItems(state, action) {
            state.formMultiItems = action.payload;
        },
        setFormImage(state, action) {
            state.formImage = action.payload;
        },
        setFormButton(state, action) {
            state.formButton = action.payload;
        },
        setFormField(state, action) {
            state.formField = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const {
    setFormTitle,
    setFormDescription,
    setFormMultiItems,
    setFormImage,
    setFormButton,
    setFormField,
    setStatus,
} = letstalkSlice.actions;
export default letstalkSlice.reducer;

export function getLetstalk() {
    return async function getLetstalkThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const letstalkAPI = await axios.get(
                `${config.BACKEND_URL}/api/contact-forms?populate[0]=Form&populate[1]=Form.Field&populate[2]=Form.Button&populate[3]=Form.FormImage&populate[4]=Form.MultiItems.MultiItem`
            );
            dispatch(setFormTitle(letstalkAPI.data.data[0].Form.FormTitle));
            dispatch(
                setFormDescription(
                    letstalkAPI.data.data[0].Form.FormDescription
                )
            );
            dispatch(
                setFormMultiItems(letstalkAPI.data.data[0].Form.MultiItems)
            );
            dispatch(setFormImage(letstalkAPI.data.data[0].Form.FormImage));

            dispatch(setFormButton(letstalkAPI.data.data[0].Form.Button));
            dispatch(setFormField(letstalkAPI.data.data[0].Form.Field));

            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
