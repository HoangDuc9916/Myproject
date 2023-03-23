
import { Modal, Switch } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    regexEmail
} from "../../../config/validation";
import { useFormik } from "formik";
import * as yup from "yup";
import { setLoading, updateUser } from '../../../redux/UserSlice/listUserSlice';
import axiosInstance from "../../../config/customAxios";
import { getUserByIdAPI } from "../../../config/baseAPI";
import InputText from "../../ui/input/index";
import { Radio } from "antd";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ModalUpdateUser = ({ modalUpdateOpen, setModalUpdateOpen }) => {

    const userId = useSelector(state => state.modal.userId);
    const loading = useSelector((state) => state.choosenUser.loading);
    const dispatch = useDispatch();

    const [users, setUsers] = useState();
    const [value, setValue] = useState(null);
    const [gender, setGender] = useState("male");
    const [status, setStatus] = useState(true);


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
            setLoading(true);
            const res = await axiosInstance.get(getUserByIdAPI + userId);
            formik.setValues(res.data);
            setUsers(res.data);
            setGender(res.data.gender);
            setStatus(res.data.status);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
    }, [userId])


    const handleCancel = () => {
        setModalUpdateOpen(false)
        setValue(null);
        setGender(null);
        setStatus(null);
        formik.resetForm();
    }

    return (
        <>
            {loading}
            <Modal
                title="Update User"
                open={modalUpdateOpen}
                onOk={formik.handleSubmit}
                onCancel={handleCancel}
            >
                <InputText
                    required
                    id="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={{
                        message: formik.errors.name,
                        touched: formik.touched.name,
                    }}
                />

                <InputText
                    required
                    id="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={{
                        message: formik.errors.email,
                        touched: formik.touched.email,
                    }}
                />
                <Box sx={{ minWidth: 120, marginTop: 4 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="gender"
                            value={gender}
                            label="Gender"
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <MenuItem value={'Male'} >Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ minWidth: 120, marginTop: 4 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="status"
                            value={status}
                            label="Status"
                            defaultChecked={status}
                            defaultValue={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value={'Active'} >Active</MenuItem>
                            <MenuItem value={'Inactive'}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

            </Modal>
        </>
    );
};

export default ModalUpdateUser;
