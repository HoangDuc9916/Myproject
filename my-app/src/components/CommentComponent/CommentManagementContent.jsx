import React, { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography, IconButton, Pagination, Button } from '@mui/material';
import { useDispatch, useSelector, } from 'react-redux';
// import { setCommentId } from '../../redux/modalSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { fetchUserById } from '../../redux/UserSlice/listUserSlice'


import { fetchAllComment } from '../../redux/CommentSlice/listCommentSlice';
// import UpdateCommentModal from '../../components/ModalComponent/CommentModal/UpdateCommentModal';
// import ModalDeleteComment from '../../components/ModalComponent/CommentModal/DeleteCommentModal';
// import ModalAddComment from '../../components/ModalComponent/CommentModal/AddCommentModal';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';

const CommentManagementContent = () => {

    const listComment = useSelector(state => state.listComment.listComment);
    const loading = useSelector((state) => state.listComment.loading);
    const userID = useSelector(state => state.listComment.user_id);
    const dispatch = useDispatch();
    const [serviceIds, setServiceIds] = useState([]);
    // const loadUser = 
    const pageSize = useSelector(state => state.listComment.pageSize);


    const [currentPage, setCurrentPage] = useState(0);

    // const isUpdateComment = useSelector(state => state.listComment.isUpdateComment);
    // const isDeleteComment = useSelector(state => state.listComment.isDeleteComment);
    // const isAddComment = useSelector(state => state.listComment.isAddComment);

    // const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    // const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    // const [modalAddOpen, setModalAddOpen] = useState(false);



    useEffect(() => {
        dispatch(fetchAllComment({
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
                Comment Manager
            </Typography>
            <Button
            // variant="contained"
            // color="success"
            // endIcon={<AddCircleIcon />}
            // onClick={() => {
            //     setModalAddOpen(true);
            // }}
            >
                <span className="leading-none">Add Comment</span>
            </Button>
            <Table size="small" style={{ marginTop: "15px" }} aria-label="a dense table">
                <TableHead>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell>PostId</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Body</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listComment.map((item, index) =>
                        <TableRow key={item.id} component="th" scope="row">

                            <TableCell >{item.post_id}</TableCell>
                            <TableCell style={{color: '#0000cc', fontWeight: 'bold'}}>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.body}</TableCell>
                            <TableCell>
                                <IconButton
                                    // aria-label="edit"
                                    // onClick={() => {
                                    //     setModalUpdateOpen(true);
                                    //     dispatch(setCommentId(item.id));
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
                                    //     dispatch(setCommentId(item.id));
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
                <UpdateCommentModal modalUpdateOpen={modalUpdateOpen} setModalUpdateOpen={setModalUpdateOpen} />
            </div>

            <div>
                <ModalDeleteComment
                    modalDeleteOpen={modalDeleteOpen}
                    setModalDeleteOpen={setModalDeleteOpen}
                />
            </div>

            <div>
                <ModalAddComment
                    modalAddOpen={modalAddOpen}
                    setModalAddOpen={setModalAddOpen}
                />
            </div> */}
        </>
    )
}

export default CommentManagementContent;