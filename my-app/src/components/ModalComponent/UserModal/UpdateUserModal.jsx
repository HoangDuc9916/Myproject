import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Skeleton } from "antd";
import { Radio } from "antd";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateUser } from "../../../redux/UserSlice/listUserSlice";
import {
    regexEmail,
} from "../../../config/validation";
import { getUserByIdAPI } from "../../../config/baseAPI";
import axiosInstance from "../../../config/customAxios";
import InputText from "../../ui/loading/Loading";


const UpdateUserModal = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.modal.userId);
    const [loading, setloading] = useState();
    const [value, setValue] = useState(null);
    const [gender, setGender] = useState("male");
    const [status, setStatus] = useState(true);


    const [oldData, setOldData] = useState();

    const validationSchema = yup.object({
        name: yup.string("Nhập họ tên").required("Họ tên là bắt buộc."),

        email: yup
            .string("Nhập email")
            .matches(regexEmail, "Email không đúng với định dạng.")
            .required("Trường email là bắt buộc."),

    });

    const formik = useFormik({
        initialValues: {},
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.gender = gender;
            values.status = status;
            dispatch(updateUser(values));
            setModalUpdateOpen(false);
        },
    });

    const fetchUser = async (userId) => {
        try {
            setloading(true);
            const res = await axiosInstance.get(getUserByIdAPI + userId);
            setloading(false);
            formik.setValues(res.data);
            setOldData(res.data);
            setGender(res.data.gender);
            setStatus(res.data.status);
        } catch (error) {
            setloading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        if (userId > 0) fetchUser(userId);
    }, [userId]);



    const handleCancel = () => {

        formik.values.name = oldData.name;
        formik.values.email = oldData.email;

        setStatus(oldData.status);
        setModalUpdateOpen(false);
    };

    return (
        <>
            {loading }
            <Modal
                title="User Info Update"
                open={modalUpdateOpen}
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
                        <FormControlLabel style={{ paddingLeft: '20px', paddingRight: '20px' }} value={"Male"} control={<Radio checked />} label="Male" />
                        <FormControlLabel value={"Female"} control={<Radio />} label="Female" />
                    </Radio.Group>
                </Box>




                <Box className="flex gap-3 mb-2">
                    <span className="mr-3  font-bold" style={{ paddingRight: '1rem' }}>Status:</span>
                    <Radio.Group
                        style={{ marginRight: "30%", padding: '0 1rem' }}
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                        className="items-center"
                    >
                        <FormControlLabel style={{ paddingRight: '5px' }} value={"Active"} control={<Radio />} label="Active" />
                        <FormControlLabel value={"Inactive"} control={<Radio />} label="Inactive" />
                    </Radio.Group>

                </Box>

            </Modal>
        </>
    );
};

export default UpdateUserModal;
