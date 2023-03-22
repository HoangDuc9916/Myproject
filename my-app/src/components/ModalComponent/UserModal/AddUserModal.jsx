import React, { useState } from "react";
import { Modal } from "antd";
// import "antd/dist/antd.css";
import { Radio } from "antd";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import {
    regexEmail
} from "../../../config/validation";

import { addUser } from "../../../redux/UserSlice/listUserSlice";

import InputText from "../../ui/input";

const ModalAddUser = ({ modalAddOpen, setModalAddOpen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);
    const [gender, setGender] = useState("male");
    const [status, setStatus] = useState(true);
    // const [error, setError] = useState([]);

    const validationSchema = yup.object({
        name: yup.string("Nhập họ tên").required("Họ tên là bắt buộc."),
        email: yup
            .string("Nhập email")
            .matches(regexEmail, "Email không đúng với định dạng.")
            .required("Trường email là bắt buộc."),
    });


    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            // gender: "",
            // status: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.gender = gender;
            values.status = status;
            dispatch(addUser(values));
            setModalAddOpen(false);
            formik.handleReset();
        },
    });

    const handleCancel = () => {
        setModalAddOpen(false);
        setValue(null);
        formik.resetForm();
    };

    return (
        <>
            <Modal
                title="Add User"
                open={modalAddOpen}
                onOk={formik.handleSubmit}
                onCancel={handleCancel}
            >
                <InputText
                    id="name"
                    required
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={{
                        message: formik.errors.name,
                        touched: formik.touched.name,
                    }}
                />

                <InputText
                    id="email"
                    required
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={{
                        message: formik.errors.email,
                        touched: formik.touched.email,
                    }}
                />

                <Box className="flex gap-3 mb-2">
                    <span className="mr-3  font-bold">Gender:</span>
                    <Radio.Group
                        style={{ marginRight: "30%" }}
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                        
                        className="items-center"
                    >
                        <FormControlLabel style={{paddingLeft: '20px', paddingRight: '20px'}} value={"Male"} control={<Radio checked/>} label="Male" />
                        <FormControlLabel value={"Female"} control={<Radio />} label="Female" />
                    </Radio.Group>
                </Box>

               


                <Box className="flex gap-3 mb-2">
                    <span className="mr-3  font-bold" style={{paddingRight: '1rem'}}>Status:</span>
                    <Radio.Group
                        style={{ marginRight: "30%" , padding: '0 1rem'}}
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                        className="items-center"
                    >
                        <FormControlLabel style={{ paddingRight: '5px'}} value={"Active"} control={<Radio />} label="Active" />
                        <FormControlLabel value={"Inactive"} control={<Radio />} label="Inactive" />
                    </Radio.Group>

                </Box>

            </Modal>
        </>
    );
};

export default ModalAddUser;
