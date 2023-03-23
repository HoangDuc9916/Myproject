
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ShowPostModal from './ShowPostModal';
import { setUserId } from '../../../redux/modalSlice';
import axiosInstance from "../../../config/customAxios";
import { getUserByIdAPI } from "../../../config/baseAPI";
import { setLoading } from '../../../redux/UserSlice/listUserSlice';



const ModalDetailUser = ({ modalDetailOpen, setModalDetailOpen }) => {
    const userId = useSelector((state) => state.modal.userId);

    const loading = useSelector((state) => state.choosenUser.loading);
    const dispatch = useDispatch();
    const [modalShowPostOpen, setModalShowPostOpen] = useState(false);

    console.log("userID: ", userId)

    const [users, setUsers] = useState([])

    // const fetchData = async () => {
    //     const response = await fetch(`https://gorest.co.in/public/v2/users/${userId}`)
    //     const data = await response.json()
    //     setUsers(data)
    // }

    // useEffect(() => {
    //     if (userId) {
    //         fetchData()
    //         console.log('sadkjasjd:  ',users.name)
    //     }

    // }, [userId])

    const fetchUser = async (userId) => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(getUserByIdAPI + userId);
            setUsers(res.data);
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


    return (
        <>
            {loading}
            <Modal
                title="User Detail"
                open={modalDetailOpen}
                footer={null}
                onCancel={() => {
                    setModalDetailOpen(false);
                }}
            >
                <Card sx={{ maxHeight: '60%' }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="240"
                        image="data:image/jpeg;base64,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"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" color={'#3333ff'}>
                            {users.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {users.email}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {users.status === 'active' ? (<span style={{ color: '#00ff99' }}>{users.status}</span>) : (<span style={{ color: '#ff3333' }}>{users.status}</span>)
                            }
                        </Typography>


                    </CardContent>
                    <CardActions>
                        <Button size="small"
                        aria-label="show-post"
                        onClick={() => {
                            setModalShowPostOpen(true);
                            dispatch(setUserId(users.id));
                            console.log("lay duoc id roi: ", users.id)
                        }}
                        >Show Post</Button>
                        {/* <Button size="small">Learn More</Button> */}
                    </CardActions>
                </Card>

            </Modal>

            <div>
                <ShowPostModal
                    modalShowPostOpen={modalShowPostOpen}
                    setModalShowPostOpen={setModalShowPostOpen}
                />
            </div>
        </>
    );
};

export default ModalDetailUser;
