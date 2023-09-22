import axios from 'axios';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BsFillTrashFill } from 'react-icons/bs';

function DeleteSupplierModal({ supplierId, setMessage, setSuppliers }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async () => {
        setShow(false);
        try {
            const rsp = await axios.delete(`${process.env.REACT_APP_API_URL}/supplier/${supplierId}`)
            if (rsp.data.success) {
                setMessage({
                    type: 'success',
                    content: rsp.data.msg
                })
                setSuppliers(prev => {
                    const suppliers = prev;
                    let index;
                    for (let i = 0; i < suppliers.length; i++) {
                        if (suppliers[i]._id === supplierId) {
                            index = i;
                            i = suppliers.length;
                        }
                    }
                    suppliers.splice(index, 1);
                    return suppliers;
                })
            }
        } catch (error) {
            setMessage({
                type: 'danger',
                content: error.response.data?.msg || error.message
            })
        }
    }

    return (
        <>
            <Button className='ms-1' variant="outline-danger" onClick={handleShow}>
                <BsFillTrashFill />
            </Button>

            <Modal className='mt-3' show={show} onHide={handleClose}>
                <Modal.Body>Bạn có chắc chắn muốn xóa nhà cung cấp này không?</Modal.Body>
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

export default DeleteSupplierModal;