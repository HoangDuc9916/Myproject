import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
// import "./../style.css";
import { deleteUser } from "../../../redux/UserSlice/listUserSlice";
import { fetchUser } from "../../../redux/UserSlice/choosenUserSlice";

const ModalDeleteUser = ({ modalDeleteOpen, setModalDeleteOpen }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.modal.userId);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const isOpenDeleteUser = useSelector(
    (state) => state.modal.isOpenDeleteUser
  );
  const [modalText, setModalText] = useState(
    "Bạn có chắc chắn muốn xóa không ?"
  );

  const handleOk = () => {
    setModalText("Đang xóa user !");
    handleDelete(userId);
    setConfirmLoading(true);
    setTimeout(() => {
      setModalDeleteOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setModalDeleteOpen(false);
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  useEffect(() => {
    if (userId > 0 && modalDeleteOpen) {
      dispatch(fetchUser(userId));
    }
  }, [isOpenDeleteUser]);

  return (
    <>
      <Modal
        className="rounded-md overflow-hidden"
        title="Thông báo"
        open={modalDeleteOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};
export default ModalDeleteUser;
