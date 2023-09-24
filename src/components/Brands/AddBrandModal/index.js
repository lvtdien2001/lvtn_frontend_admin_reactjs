import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './AddBrandModal.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

const AddBrandModal = ({ setBrands, setMessage }) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [file, setFile] = useState({});
    const [imgDemoUrl, setImgDemoUrl] = useState('');
    const [isInvalid, setIsInvalid] = useState({ name: false, logo: false })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const resetData = () => {
        setName('');
        setFile({});
        setImgDemoUrl('');
        setIsInvalid({ name: false, logo: false });
    }

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
        if (name.length >= 3 && file.name) {
            setShow(false);
            const formData = new FormData();
            formData.append('name', name);
            formData.append('logo', file)
            const rsp = await axios.post(`${process.env.REACT_APP_API_URL}/brand`, formData);
            if (rsp.data.success) {
                setMessage({
                    content: rsp.data.msg,
                    type: 'success'
                });
                setBrands(prev => [...prev, rsp.data.newBrand])
            }
            resetData();
        } else {
            setIsInvalid({
                name: name.length < 3 ? true : false,
                logo: !file.name ? true : false
            })
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
                    isInvalid={isInvalid.name}
                />
                <Form.Control.Feedback type="invalid">
                    Tên thương hiệu phải có ít nhất 3 ký tự!
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label><b>Logo</b></Form.Label>
                <Form.Control
                    type='file'
                    onChange={e => handleChangeFile(e.target.files[0])}
                    isInvalid={isInvalid.logo}
                />
                <Form.Control.Feedback type="invalid">
                    Bạn chưa chọn hình ảnh!
                </Form.Control.Feedback>
                <div className={`text-center ${cx('demo-img')}`}>
                    <img className='mt-4' src={imgDemoUrl} alt="Không tìm thấy hình ảnh" width='225px' height='50px' />
                </div>
            </Form.Group>
        </Form>
    )

    return (
        <>
            <Button className='mb-1' variant="outline-primary" onClick={handleShow}>
                Thêm thương hiệu
            </Button>

            <Modal
                className='mt-3'
                show={show}
                onHide={handleClose}
                backdrop='static'
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm thương hiệu mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="outline-success" onClick={handleSubmit}>
                        Gửi
                    </Button>
                    <Button variant="outline-danger" onClick={handleClose}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddBrandModal;