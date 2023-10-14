import { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './UpdateProductModal.module.scss';

const cx = classNames.bind(styles);

function UpdateProductModal({ product, setProducts, setMessage, brands }) {
    const [show, setShow] = useState(false);
    const [file, setFile] = useState({});
    const [imgDemoUrl, setImgDemoUrl] = useState(product?.image?.url);
    const [submitData, setSubmitData] = useState({
        name: product?.name,
        brandId: product?.brand._id,
        styleCode: product?.style.code,
        strapCode: product?.strap.code,
        glassCode: product?.glass.code,
        systemCode: product?.system.code,
        description: product?.description,
        gender: product?.gender
    });
    const [isInvalid, setIsInvalid] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChangeFile = (e) => {
        if (e.target.files[0]) {
            let value = URL.createObjectURL(e.target.files[0]);
            setImgDemoUrl(value);
            setFile(e.target.files[0]);
        } else {
            setImgDemoUrl('');
        }
    }

    const handleChangeData = (e) => {
        setSubmitData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault();
        }
        if (submitData.name.length > 10) {
            setShow(false);
            const formData = new FormData();
            formData.append('name', submitData.name);
            formData.append('brandId', submitData.brandId);
            formData.append('styleCode', submitData.styleCode);
            formData.append('strapCode', submitData.strapCode);
            formData.append('glassCode', submitData.glassCode);
            formData.append('systemCode', submitData.systemCode);
            formData.append('description', submitData.description);
            formData.append('gender', submitData.gender);
            file?.name && formData.append('image', file);
            try {
                const rsp = await axios.put(`${process.env.REACT_APP_API_URL}/product/${product._id}`, formData);
                if (rsp.data.success) {
                    setMessage({
                        content: rsp.data.msg,
                        type: 'success'
                    })
                    setProducts(prev => {
                        const products = prev;
                        let index;
                        for (let i = 0; i < products.length; i++) {
                            if (products[i]._id === product._id) {
                                index = i;
                                i = products.length;
                            }
                        }
                        products[index] = rsp.data.updatedProduct;
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
                        content: 'Lỗi rồi! Cập nhật thất bại'
                    })
                }
            }
        } else {
            setIsInvalid(true);
        }
    }

    let body = (
        <Form onSubmit={e => handleSubmit(e)}>
            <Row>
                <Col lg={6}>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Tên sản phẩm</b></Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            placeholder="Nhập tên sản phẩm"
                            value={submitData.name}
                            name='name'
                            onChange={e => handleChangeData(e)}
                            isInvalid={isInvalid}
                        />
                        <Form.Control.Feedback type="invalid">
                            Tên sản phẩm phải có ít nhất 10 ký tự!
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Thương hiệu</b></Form.Label>
                        <Form.Select
                            name='brandId'
                            onChange={e => handleChangeData(e)}
                            defaultValue={submitData.brandId}
                        >
                            {brands.map(brand => {
                                return (
                                    <option key={brand._id} value={brand._id}>{brand.name}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Giới tính</b></Form.Label>
                        <div>
                            <Form.Check
                                type='radio'
                                label='Cặp đôi'
                                name='gender'
                                inline
                                defaultChecked={submitData.gender === 0}
                                onChange={() => setSubmitData(prev => { return { ...prev, gender: 0 } })}
                            />
                            <Form.Check
                                type='radio'
                                label='Nam'
                                name='gender'
                                inline
                                defaultChecked={submitData.gender === 1}
                                onChange={() => setSubmitData(prev => { return { ...prev, gender: 1 } })}
                            />
                            <Form.Check
                                type='radio'
                                label='Nữ'
                                name='gender'
                                inline
                                defaultChecked={submitData.gender === 2}
                                onChange={() => setSubmitData(prev => { return { ...prev, gender: 2 } })}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Hình ảnh</b></Form.Label>
                        <Form.Control
                            type='file'
                            onChange={e => handleChangeFile(e)}
                        />
                        <div className={`text-center ${cx('demo-img')}`}>
                            <img src={imgDemoUrl} alt="Không tìm thấy hình ảnh" width='130px' height='130px' />
                        </div>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Dòng sản phẩm</b></Form.Label>
                        <Form.Select
                            name='styleCode'
                            defaultValue={product?.style.code}
                            onChange={e => handleChangeData(e)}
                        >
                            <option value="01">Thời trang</option>
                            <option value="02">Hiện đại</option>
                            <option value="03">Sang trọng</option>
                            <option value="04">Thể thao</option>
                            <option value="05">Quân đội</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Dây đeo</b></Form.Label>
                        <Form.Select
                            defaultValue={product?.strap.code}
                            name='strapCode'
                            onChange={e => handleChangeData(e)}
                        >
                            <option value="01">Dây da</option>
                            <option value="02">Dây kim loại</option>
                            <option value="03">Dây cao su</option>
                            <option value="04">Dây vải</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Mặt kính</b></Form.Label>
                        <Form.Select
                            name='glassCode'
                            defaultValue={product?.glass.code}
                            onChange={e => handleChangeData(e)}
                        >
                            <option value="01">Kính khoáng Mineral (Kính cứng)</option>
                            <option value="02">Sapphire (Kính Chống Trầy)</option>
                            <option value="03">Resin Glass (Kính Nhựa)</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Bộ máy</b></Form.Label>
                        <Form.Select
                            name='systemCode'
                            defaultValue={product?.system.code}
                            onChange={e => handleChangeData(e)}
                        >
                            <option value="01">Cơ tự động (Automatic)</option>
                            <option value="02">Quartz (Pin)</option>
                            <option value="03">Eco-Drive (Năng Lượng Ánh Sáng)</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label><b>Mô tả</b></Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nhập mô tả sản phẩm"
                    as='textarea'
                    rows={5}
                    name='description'
                    value={submitData.description}
                    onChange={e => handleChangeData(e)}
                />
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
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin sản phẩm</Modal.Title>
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

export default UpdateProductModal;