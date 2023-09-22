import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const AddSupplierModal = ({ setMessage, setSuppliers }) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [isInvalid, setIsInvalid] = useState({ name: false, address: false });

    const resetData = () => {
        setName('');
        setAddress('');
        setIsInvalid({ name: false, address: false });
    }

    const handleClose = () => {
        setShow(false);
        resetData();
    };
    const handleShow = () => setShow(true);

    const handleSubmit = async e => {
        if (e) {
            e.preventDefault();
        }
        if (name.length < 8 || address.length < 10) {
            setIsInvalid({
                name: name.length < 8,
                address: address.length < 10
            })
        } else {
            const submitData = { name, address }
            try {
                const rsp = await axios.post(`${process.env.REACT_APP_API_URL}/supplier`, submitData);
                if (rsp.data.success) {
                    setSuppliers(prev => {
                        return [...prev, rsp.data.newSupplier]
                    });
                    handleClose();
                    setMessage({
                        type: 'success',
                        content: rsp.data.msg
                    });
                    resetData();
                }

            } catch (error) {
                setMessage({
                    type: 'danger',
                    content: error.response.data?.msg || error.message
                });
            }
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
                    isInvalid={isInvalid.name}
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
                    isInvalid={isInvalid.address}
                />
                <Form.Control.Feedback type="invalid">
                    Địa chỉ phải có ít nhất 10 ký tự!
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
    )

    return (
        <>
            <Button className='mb-1' variant="outline-primary" onClick={handleShow}>
                Thêm nhà cung cấp
            </Button>

            <Modal
                className='mt-3'
                show={show}
                onHide={handleClose}
                backdrop='static'
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm nhà cung cấp mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="outline-danger" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button type='button' variant="outline-success" onClick={handleSubmit}>
                        Gửi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddSupplierModal
