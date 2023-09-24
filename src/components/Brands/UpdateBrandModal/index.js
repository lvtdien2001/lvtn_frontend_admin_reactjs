import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './UpdateBrandModal.module.scss';

const cx = classNames.bind(styles);

function UpdateBrandModal({ setMessage, brand, setBrands }) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState(brand?.name);
    const [file, setFile] = useState({});
    const [imgDemoUrl, setImgDemoUrl] = useState(brand?.logo.url);
    const [isInvalid, setIsInvalid] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChangeFile = (file) => {
        if (file) {
            let value = URL.createObjectURL(file);
            setImgDemoUrl(value);
        } else {
            setImgDemoUrl('');
        }
        setFile(file);
    }

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault();
        }
        if (name.length >= 5) {
            setShow(false);
            const formData = new FormData();
            formData.append('name', name);
            file && formData.append('logo', file);

            const rsp = await axios.put(`${process.env.REACT_APP_API_URL}/brand/${brand._id}`, formData);
            if (rsp.data.success) {
                setMessage({
                    content: rsp.data.msg,
                    type: 'success'
                });
                setBrands(prev => {
                    const brands = prev;
                    let index;
                    for (let i = 0; i < brands.length; i++) {
                        if (brands[i]._id === brand._id) {
                            index = i;
                            i = brands.length;
                        }
                    }
                    brands[index] = rsp.data.updatedBrand;
                    return brands;
                })
            }
        } else {
            setIsInvalid(true);
        }
    }

    let body = (
        <Form onSubmit={e => handleSubmit(e)}>
            <Form.Group className="mb-3">
                <Form.Label><b>Tên thương hiệu</b></Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    placeholder="Nhập tên thương hiệu"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    isInvalid={isInvalid}
                />
                <Form.Control.Feedback type="invalid">
                    Tên sản phẩm phải có ít nhất 10 ký tự!
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label><b>Logo</b></Form.Label>
                <Form.Control
                    type='file'
                    onChange={e => handleChangeFile(e.target.files[0])}
                />
                <div className={`text-center ${cx('demo-img')}`}>
                    <img className='mt-4' src={imgDemoUrl} alt="Không tìm thấy hình ảnh" width='225px' height='50px' />
                </div>
            </Form.Group>
        </Form>
    )

    return (
        <>
            <Button className='me-1' variant="outline-success" onClick={handleShow}>
                <BsPencilSquare />
            </Button>

            <Modal
                className='mt-3'
                show={show}
                onHide={handleClose}
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin thương hiệu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="outline-success" onClick={handleSubmit}>
                        Lưu
                    </Button>
                    <Button variant="outline-danger" onClick={handleClose}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateBrandModal;