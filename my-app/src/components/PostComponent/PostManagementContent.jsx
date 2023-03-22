import React, { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography, IconButton, Pagination, Button } from '@mui/material';
import { useDispatch, useSelector, } from 'react-redux';
// import { setPostId } from '../../redux/modalSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { fetchUserById } from '../../redux/UserSlice/listUserSlice'


import { fetchAllPost } from '../../redux/PostSlice/listPostSlice';
// import UpdatePostModal from '../../components/ModalComponent/PostModal/UpdatePostModal';
// import ModalDeletePost from '../../components/ModalComponent/PostModal/DeletePostModal';
// import ModalAddPost from '../../components/ModalComponent/PostModal/AddPostModal';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';

const PostManagementContent = () => {

    const listPost = useSelector(state => state.listPost.listPost);
    const loading = useSelector((state) => state.listPost.loading);
    const userID = useSelector(state => state.listPost.user_id);
    const dispatch = useDispatch();
    const [serviceIds, setServiceIds] = useState([]);
    // const loadUser = 
    const pageSize = useSelector(state => state.listPost.pageSize);


    const [currentPage, setCurrentPage] = useState(0);

    // const isUpdatePost = useSelector(state => state.listPost.isUpdatePost);
    // const isDeletePost = useSelector(state => state.listPost.isDeletePost);
    // const isAddPost = useSelector(state => state.listPost.isAddPost);

    // const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    // const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    // const [modalAddOpen, setModalAddOpen] = useState(false);



    useEffect(() => {
        dispatch(fetchAllPost({
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



    // const loadUserById = async (userId) => {
    //     try {
    //       dispatch(fetchUserById(userId));
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    //   useEffect(() => {
    //     setServiceIds(listServiceByCategory);
    //   }, [listServiceByCategory]);

    return (
        <>
            {loading}
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
            >
                Post Manager
            </Typography>
            <Button
            // variant="contained"
            // color="success"
            // endIcon={<AddCircleIcon />}
            // onClick={() => {
            //     setModalAddOpen(true);
            // }}
            >
                <span className="leading-none">Add Post</span>
            </Button>
            <Table size="small" style={{ marginTop: "15px" }} aria-label="a dense table">
                <TableHead>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>UserId</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Body</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listPost.map((item, index) =>
                        <TableRow key={item.id} component="th" scope="row">

                            <TableCell >{item.user_id}</TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.body}</TableCell>
                            <TableCell>
                                <IconButton
                                    // aria-label="edit"
                                    // onClick={() => {
                                    //     setModalUpdateOpen(true);
                                    //     dispatch(setPostId(item.id));
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
                                    //     dispatch(setPostId(item.id));
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
                <UpdatePostModal modalUpdateOpen={modalUpdateOpen} setModalUpdateOpen={setModalUpdateOpen} />
            </div>

            <div>
                <ModalDeletePost
                    modalDeleteOpen={modalDeleteOpen}
                    setModalDeleteOpen={setModalDeleteOpen}
                />
            </div>

            <div>
                <ModalAddPost
                    modalAddOpen={modalAddOpen}
                    setModalAddOpen={setModalAddOpen}
                />
            </div> */}
        </>
    )
}

export default PostManagementContent;