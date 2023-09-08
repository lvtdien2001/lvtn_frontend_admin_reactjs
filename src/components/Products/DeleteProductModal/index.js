import axios from 'axios';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BsFillTrashFill } from 'react-icons/bs';

function DeleteProductModal({ productId, setMessage, setProducts }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async () => {
        setShow(false);
        try {
            const rsp = await axios.delete(`${process.env.REACT_APP_API_URL}/product/${productId}`)
            if (rsp.data.success) {
                setMessage({
                    type: 'success',
                    content: rsp.data.msg
                })
                setProducts(prev => {
                    const products = prev;
                    let index;
                    for (let i = 0; i < products.length; i++) {
                        if (products[i]._id === productId) {
                            index = i;
                            i = products.length;
                        }
                    }
                    products.splice(index, 1);
                    return products;
                })
            }
        } catch (error) {
            if (error.response) {
                setMessage({
                    type: 'danger',
                    content: error.response.message
                });
            } else {
                setMessage({
                    type: 'danger',
                    content: 'Lỗi rồi! Xóa thất bại'
                })
            }
        }
    }

    return (
        <>
            <Button variant="outline-danger" onClick={handleShow}>
                <BsFillTrashFill />
            </Button>

            <Modal className='mt-3' show={show} onHide={handleClose}>
                <Modal.Body>Bạn có chắc chắn muốn xóa sản phẩm này không?</Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="outline-success" onClick={handleDelete}>
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

export default DeleteProductModal;