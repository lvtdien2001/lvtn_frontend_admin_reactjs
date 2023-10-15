import axios from 'axios';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BsFillUnlockFill } from 'react-icons/bs';

const UnLockAccountModal = ({ userId, setMessage, setReload }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLock = async () => {
        try {
            const rsp = await axios.put(`${process.env.REACT_APP_API_URL}/user/disable/${userId}`);
            setMessage({
                type: 'success',
                content: rsp.data.msg
            });
            setReload(prev => !prev);
        } catch (error) {
            setMessage({
                type: 'danger',
                content: error.response?.data.msg || error.message
            })
        }
    }

    return (
        <>
            <Button
                variant='outline-success'
                className='mb-1'
                size='sm'
                onClick={handleShow}
            >
                <BsFillUnlockFill />
            </Button>

            <Modal className='mt-3' show={show} onHide={handleClose}>
                <Modal.Body>Bạn có chắc chắn muốn mở khóa tài khoản này không?</Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="outline-success" onClick={handleLock} >
                        OK
                    </Button>
                    <Button variant="outline-danger" onClick={handleClose}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UnLockAccountModal
