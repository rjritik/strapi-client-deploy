import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import style from "./LetsTalk.module.css";
import { Modal } from "react-bootstrap";
import parser from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { getLetstalk } from "../../../store/letstalkSlice";
import { useLocation } from "react-router-dom";

const LetsTalk = ({ show, onHide }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { formTitle, formDescription, formImage, formButton, formField } =
        useSelector((state) => state.letstalk);

    useEffect(() => {
        setTimeout(() => {
            if (
                formTitle === null ||
                formDescription === null ||
                formImage === null ||
                formButton === null ||
                !formField.length > 0
            ) {
                dispatch(getLetstalk());
            }
        }, 625);
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        setError,
        formState,
        formState: { errors },
    } = useForm();

    const onSubmit = (data, e) => {
        reset();
        onHide();
        console.log("data =", data);
        console.log("location.pathname = ", location.pathname);
    };

    // console.log(formState.isDirty);

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="md"
                centered
                className={`overflow-hidden111 ${style.letstalk_modal}`}
            >
                <div className="d-flex flex-wrap">
                    <div className="col-md-5 d-none d-md-block">
                        {formImage && (
                            <img
                                src={formImage.url}
                                alt={formImage.alternativeText}
                                loading="lazy"
                                className="w-100 h-100 object-fit-cover img-dark-mode"
                            />
                        )}
                    </div>
                    <div className="col-md-7 p-4">
                        {/* <div className="col-sm-12 p-4"> */}
                        <Modal.Header
                            closeButton
                            className="align-items-start p-0 mb-2 border-0"
                        >
                            <Modal.Title className="fs-3 fw-bold lh-body mb-0 w-100">
                                {formTitle}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="p-0">
                            {parser(`${formDescription}`)}

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="-mb-3"
                            >
                                {formField.map((field, index) => {
                                    // console.log("field = ", field);
                                    return (
                                        <div
                                            key={field.id}
                                            className="form-group mb-3"
                                        >
                                            {field.Type !== "textarea" ? (
                                                <input
                                                    className="form-control"
                                                    {...register(
                                                        field.Name,
                                                        (field.Name ===
                                                            "name" && {
                                                            required: true,
                                                            pattern:
                                                                /^[A-Za-z]+$/i,
                                                            min: 2,
                                                        }) ||
                                                            (field.Name ===
                                                                "email" && {
                                                                required: true,
                                                                pattern:
                                                                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                                min: 2,
                                                            }) ||
                                                            (field.Name ===
                                                                "phone" && {
                                                                required: true,
                                                                pattern:
                                                                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                                            })
                                                    )}
                                                    placeholder={
                                                        field.Placeholder
                                                    }
                                                />
                                            ) : (
                                                // <input
                                                //     className="form-control"
                                                //     {...register(field.Name, {
                                                //         required:
                                                //             field.Required,
                                                //     })}
                                                //     placeholder={
                                                //         field.Placeholder
                                                //     }
                                                // />
                                                <textarea
                                                    className="form-control"
                                                    {...register(field.Name, {
                                                        required:
                                                            field.Required,
                                                    })}
                                                    placeholder={
                                                        field.Placeholder
                                                    }
                                                ></textarea>
                                            )}
                                            {errors[field.Name] && (
                                                <div className="form-error">
                                                    This field is required
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                <div className="form-group mb-3">
                                    <button
                                        className="btn btn-secondary btn-sm w-100"
                                        type="submit"
                                    >
                                        {formButton && formButton.Title}
                                    </button>
                                </div>
                            </form>
                        </Modal.Body>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default LetsTalk;
