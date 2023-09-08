import axios from 'axios';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BsFillTrashFill } from 'react-icons/bs';

function DeleteBrandModal({ brandId, setMessage, setBrands }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async () => {
        setShow(false);
        try {
            const rsp = await axios.delete(`${process.env.REACT_APP_API_URL}/brand/${brandId}`)
            if (rsp.data.success) {
                setMessage({
                    type: 'success',
                    content: rsp.data.msg
                })
                setBrands(prev => {
                    const brands = prev;
                    let index;
                    for (let i = 0; i < brands.length; i++) {
                        if (brands[i]._id === brandId) {
                            index = i;
                            i = brands.length;
                        }
                    }
                    brands.splice(index, 1);
                    return brands;
                })
            }
        } catch (error) {
            if (error.response) {
                setMessage({
                    type: 'danger',
                    content: error.response.data.msg
                });
            } else {
                setMessage({
                    type: 'danger',
                    content: error.message
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
                <Modal.Body>Bạn có chắc chắn muốn xóa thương hiệu này không?</Modal.Body>
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

export default DeleteBrandModal;