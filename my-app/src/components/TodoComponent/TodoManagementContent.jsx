import React, { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography, IconButton, Pagination, Button } from '@mui/material';
import { useDispatch, useSelector, } from 'react-redux';
// import { setTodoId } from '../../redux/modalSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { fetchUserById } from '../../redux/UserSlice/listUserSlice'


import { fetchAllTodo } from '../../redux/TodoSlice/listTodoSlice';
// import UpdateTodoModal from '../../components/ModalComponent/TodoModal/UpdateTodoModal';
// import ModalDeleteTodo from '../../components/ModalComponent/TodoModal/DeleteTodoModal';
// import ModalAddTodo from '../../components/ModalComponent/TodoModal/AddTodoModal';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';

const TodoManagementContent = () => {

    const listTodo = useSelector(state => state.listTodo.listTodo);
    const loading = useSelector((state) => state.listTodo.loading);
    const userID = useSelector(state => state.listTodo.user_id);
    const dispatch = useDispatch();
    const [serviceIds, setServiceIds] = useState([]);
    // const loadUser = 
    const pageSize = useSelector(state => state.listTodo.pageSize);


    const [currentPage, setCurrentPage] = useState(0);

    // const isUpdateTodo = useSelector(state => state.listTodo.isUpdateTodo);
    // const isDeleteTodo = useSelector(state => state.listTodo.isDeleteTodo);
    // const isAddTodo = useSelector(state => state.listTodo.isAddTodo);

    // const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    // const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    // const [modalAddOpen, setModalAddOpen] = useState(false);



    useEffect(() => {
        dispatch(fetchAllTodo({
            size: pageSize,
            page: currentPage
        },
        ));
    }, [currentPage])


    const loadUserById = async (userID) => {
        try {
            dispatch(fetchUserById(userID));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        setServiceIds(userID);
    }, [userID]);


    return (
        <>
            {loading}
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
            >
                Todo Manager
            </Typography>
            <Button
            // variant="contained"
            // color="success"
            // endIcon={<AddCircleIcon />}
            // onClick={() => {
            //     setModalAddOpen(true);
            // }}
            >
                <span className="leading-none">Add Todo</span>
            </Button>
            <Table size="small" style={{ marginTop: "15px" }} aria-label="a dense table">
                <TableHead>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell>UserId</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Due On</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listTodo.map((item, index) =>
                        <TableRow key={item.id} component="th" scope="row">

                            <TableCell >{item.user_id}</TableCell>
                            <TableCell >{item.title}</TableCell>
                            <TableCell>{item.due_on}</TableCell>
                            <TableCell >
                                {item.status === 'completed' ? (<span style={{ color: '#33ff33' }}>{item.status}</span>) : (<span style={{ color: '#ffd633' }}>{item.status}</span>)
                                }
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    // aria-label="edit"
                                    // onClick={() => {
                                    //     setModalUpdateOpen(true);
                                    //     dispatch(setTodoId(item.id));
                                    // }}
                                    disabled={true}
                                >
                                    <EditIcon style={{ color: '#ff8c1a' }} />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    // aria-label="delete"
                                    // onClick={() => {
                                    //     setModalDeleteOpen(true);
                                    //     dispatch(setTodoId(item.id));
                                    // }}
                                    disabled={true}
                                >
                                    <DeleteIcon style={{ color: '#4da6ff' }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={10} color="secondary"
                    showFirstButton showLastButton
                    defaultPage={1}
                    onChange={(e, pageNumber) => {
                        setCurrentPage(pageNumber)
                    }}
                />
            </div>
            {/* <div>
                <UpdateTodoModal modalUpdateOpen={modalUpdateOpen} setModalUpdateOpen={setModalUpdateOpen} />
            </div>

            <div>
                <ModalDeleteTodo
                    modalDeleteOpen={modalDeleteOpen}
                    setModalDeleteOpen={setModalDeleteOpen}
                />
            </div>

            <div>
                <ModalAddTodo
                    modalAddOpen={modalAddOpen}
                    setModalAddOpen={setModalAddOpen}
                />
            </div> */}
        </>
    )
}

export default TodoManagementContent;