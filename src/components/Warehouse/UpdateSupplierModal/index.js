import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { BsPencilSquare } from 'react-icons/bs';

const UpdateSupplierModal = ({ setMessage, setSuppliers, supplier }) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState(supplier.name);
    const [address, setAddress] = useState(supplier.address);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async e => {
        if (e) {
            e.preventDefault();
        }
        const submitData = { name, address }
        try {
            const rsp = await axios.put(`${process.env.REACT_APP_API_URL}/supplier/${supplier._id}`, submitData);
            if (rsp.data.success) {
                setSuppliers(prev => {
                    let suppliers = prev;
                    for (let i = 0; i < suppliers.length; i++) {
                        if (suppliers[i]._id === supplier._id) {
                            suppliers[i] = rsp.data.updatedSupplier;
                        }
                    }
                    return suppliers;
                });
                handleClose();
                setMessage({
                    type: 'success',
                    content: rsp.data.msg
                });
            }

        } catch (error) {
            setMessage({
                type: 'danger',
                content: error.response.data?.msg || error.message
            });
        }
    }

    let body = (
        <Form onSubmit={e => handleSubmit(e)}>
            <Form.Group className="mb-3">
                <Form.Label><b>Tên nhà cung cấp</b></Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    placeholder="Nhập tên nhà cung cấp mới"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    Tên nhà cung cấp phải có ít nhất 8 ký tự!
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label><b>Địa chỉ</b></Form.Label>
                <Form.Control
                    as='textarea'
                    placeholder="Nhập địa chỉ nhà cung cấp"
                    rows={2}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    Địa chỉ phải có ít nhất 10 ký tự!
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
    )

    return (
        <>
            <Button className='mb-1' variant="outline-success" onClick={handleShow}>
                <BsPencilSquare />
            </Button>

            <Modal
                className='mt-3'
                show={show}
                onHide={handleClose}
                backdrop='static'
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin nhà cung cấp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="outline-danger" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button type='button' variant="outline-success" onClick={handleSubmit}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateSupplierModal
