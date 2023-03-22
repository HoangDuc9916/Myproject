import React, { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography, IconButton, Pagination, Button } from '@mui/material';
import { useDispatch, useSelector, } from 'react-redux';
import { setUserId } from '../../redux/modalSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { fetchAllUser } from '../../redux/UserSlice/listUserSlice';
import UpdateUserModal from '../../components/ModalComponent/UserModal/UpdateUserModal';
import ModalDeleteUser from '../../components/ModalComponent/UserModal/DeleteUserModal';
import ModalAddUser from '../../components/ModalComponent/UserModal/AddUserModal';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';

const UserManagementContent = () => {

    const listUser = useSelector(state => state.listUser.listUser)
    const loading = useSelector((state) => state.listUser.loading);
    const dispatch = useDispatch()
    const pageSize = useSelector(state => state.listUser.pageSize)

    const [currentPage, setCurrentPage] = useState(0);

    const isUpdateUser = useSelector(state => state.listUser.isUpdateUser);
    const isDeleteUser = useSelector(state => state.listUser.isDeleteUser);
    const isAddUser = useSelector(state => state.listUser.isAddUser);

    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalAddOpen, setModalAddOpen] = useState(false);



    useEffect(() => {
        dispatch(fetchAllUser({
            size: pageSize,
            page: currentPage
        },
        ));
    }, [currentPage, isAddUser, isUpdateUser, isDeleteUser])

    return (
        <>
            {loading}
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
            >
                User Manager
            </Typography>
            <Button
                variant="contained"
                color="success"
                endIcon={<AddCircleIcon />}
                onClick={() => {
                    setModalAddOpen(true);
                }}
            >
                <span className="leading-none">Add User</span>
            </Button>
            <Table size="small" style={{ marginTop: "15px" }} aria-label="a dense table">
                <TableHead>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listUser.map((item, index) =>
                        <TableRow key={item.id} component="th" scope="row">

                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell style={{ paddingLeft: '2rem' }}>
                                {item.gender === 'male' ? (<ManIcon style={{ color: '#33ccff' }} />) : (<WomanIcon style={{ color: '#ff66ff' }} />)
                                }
                            </TableCell>
                            <TableCell >
                                {item.status === 'active' ? (<span style={{ color: '#00ff99' }}>{item.status}</span>) : (<span style={{ color: '#ff3333' }}>{item.status}</span>)
                                }
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="edit"
                                    onClick={() => {
                                        setModalUpdateOpen(true);
                                        dispatch(setUserId(item.id));
                                    }}>
                                    <EditIcon style={{ color: '#ff8c1a' }} />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="delete"
                                    onClick={() => {
                                        setModalDeleteOpen(true);
                                        dispatch(setUserId(item.id));
                                    }}>
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
            <div>
                <UpdateUserModal modalUpdateOpen={modalUpdateOpen} setModalUpdateOpen={setModalUpdateOpen} />
            </div>

            <div>
                <ModalDeleteUser
                    modalDeleteOpen={modalDeleteOpen}
                    setModalDeleteOpen={setModalDeleteOpen}
                />
            </div>

            <div>
                <ModalAddUser
                    modalAddOpen={modalAddOpen}
                    setModalAddOpen={setModalAddOpen}
                />
            </div>
        </>
    )
}

export default UserManagementContent;