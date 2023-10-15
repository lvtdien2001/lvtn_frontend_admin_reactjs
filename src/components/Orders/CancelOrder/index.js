import axios from 'axios';
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const CancelOrder = ({ order, setMessage, setReload }) => {
    const [show, setShow] = useState(false);
    const [reason, setReason] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async () => {
        if (!reason) {
            setIsInvalid(true);
        } else {
            try {
                const rsp = await axios.put(`${process.env.REACT_APP_API_URL}/order/cancel/${order._id}`, { cancelReason: reason });
                setMessage({
                    type: 'success',
                    content: rsp.data.msg
                });
                setReload(prev => !prev);
                setReason('');
                setIsInvalid(false);
            } catch (error) {
                setMessage({
                    type: 'danger',
                    content: error.response?.data.msg || error.message
                })
            }
        }

    }

    let body = (
        <Form>
            <Form.Group>
                <Form.Label>Lý do</Form.Label>
                <Form.Control
                    as='textarea'
                    row={3}
                    placeholder='Nhập lý do hủy đơn hàng'
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    isInvalid={isInvalid}
                />
                <Form.Control.Feedback type='invalid'>
                    Bạn chưa nhập lý do
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
    )

    return (
        <>
            <Button className='ms-2' variant="danger" onClick={handleShow}>
                Hủy đơn hàng
            </Button>

            <Modal className='mt-3' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Hủy đơn hàng</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {body}
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button onClick={handleSubmit} variant="danger">
                        Xác nhận hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CancelOrder;