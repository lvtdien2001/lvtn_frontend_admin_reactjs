import { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import axios from 'axios';
import styles from './AddProductModal.module.scss';

const cx = classNames.bind(styles);

const AddProductModal = ({ setLoading, setMessage, brands, setReload }) => {
    const [show, setShow] = useState(false);
    const [file, setFile] = useState({});
    const [imgDemoUrl, setImgDemoUrl] = useState('');

    const [isInvalid, setIsInvalid] = useState({
        name: false, brand: false, image: false, style: false, strap: false, glass: false, system: false
    });
    const [submitData, setSubmitData] = useState({
        name: '', brandId: '', styleCode: '', strapCode: '', glassCode: '', systemCode: '', description: '', gender: 0
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const resetData = () => {
        setFile({});
        setImgDemoUrl('');
        setIsInvalid({
            name: false, brand: false, image: false, style: false, strap: false, glass: false, system: false
        });
        setSubmitData({
            name: '', brandId: '', styleCode: '', strapCode: '', glassCode: '', systemCode: '', description: '', gender: 0
        });
    }

    const handleChangeData = (e) => {
        setSubmitData({
            ...submitData,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeFile = (e) => {
        if (e.target.files[0]) {
            let value = URL.createObjectURL(e.target.files[0]);
            setImgDemoUrl(value);
            setFile(e.target.files[0]);
        } else {
            setImgDemoUrl('');
        }
    }

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault();
        }
        const { name, brandId, styleCode, strapCode, glassCode, systemCode, gender, description } = submitData;

        const isValid = !(name.length < 10 || brandId === '' || styleCode === '' || strapCode === '' || glassCode === '' || systemCode === '' || !file.name);
        // send request
        if (isValid) {
            setShow(false);
            const formData = new FormData();
            formData.append('name', name);
            formData.append('brandId', brandId);
            formData.append('image', file);
            formData.append('styleCode', styleCode);
            formData.append('strapCode', strapCode);
            formData.append('glassCode', glassCode);
            formData.append('systemCode', systemCode);
            formData.append('description', description);
            formData.append('gender', gender);
            try {
                setLoading(true);
                const rsp = await axios.post(`${process.env.REACT_APP_API_URL}/product`, formData);
                if (rsp.data.success) {
                    setMessage({
                        type: 'success',
                        content: rsp.data.msg
                    });
                    setReload(prev => !prev);
                }
            } catch (error) {
                setMessage({
                    type: 'danger',
                    content: error.response?.data.msg || error.message
                })
            }
            resetData();
        } else {
            // validate form
            setIsInvalid({
                ...isInvalid,
                name: name.length < 10 ? true : false,
                brand: brandId === '' ? true : false,
                style: styleCode === '' ? true : false,
                strap: strapCode === '' ? true : false,
                glass: glassCode === '' ? true : false,
                system: systemCode === '' ? true : false,
                image: !file.name ? true : false
            })
        }
    }

    let body = (
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Row>
                <Col lg={6}>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Tên sản phẩm</b></Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            placeholder="Nhập tên sản phẩm"
                            name='name'
                            value={submitData.name}
                            onChange={e => handleChangeData(e)}
                            isInvalid={isInvalid.name}
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
                            value={submitData.brandId}
                            name='brandId'
                            onChange={e => handleChangeData(e)}
                            isInvalid={isInvalid.brand}
                        >
                            <option hidden>-- Chọn thương hiệu --</option>
                            {brands && brands.map(brand => {
                                return (
                                    <option key={brand._id} value={brand._id}>{brand.name}</option>
                                )
                            })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Bạn chưa chọn thương hiệu!
                        </Form.Control.Feedback>
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
                                id='0'
                                defaultChecked
                                onChange={() => setSubmitData(prev => { return { ...prev, gender: 0 } })}
                            />
                            <Form.Check
                                type='radio'
                                label='Nam'
                                name='gender'
                                inline
                                id='1'
                                onChange={() => setSubmitData(prev => { return { ...prev, gender: 1 } })}
                            />
                            <Form.Check
                                type='radio'
                                label='Nữ'
                                name='gender'
                                inline
                                id='2'
                                onChange={() => setSubmitData(prev => { return { ...prev, gender: 2 } })}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label><b>Hình ảnh</b></Form.Label>
                        <Form.Control
                            type='file'
                            isInvalid={isInvalid.image}
                            onChange={e => handleChangeFile(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Bạn chưa chọn hình ảnh!
                        </Form.Control.Feedback>
                        <div className={`text-center ${cx('demo-img')}`}>
                            <img src={imgDemoUrl} alt="Không tìm thấy hình ảnh" width='130px' height='130px' />
                        </div>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Dòng sản phẩm</b></Form.Label>
                        <Form.Select
                            value={submitData.styleCode}
                            name='styleCode'
                            onChange={e => handleChangeData(e)}
                            isInvalid={isInvalid.style}
                        >
                            <option hidden>-- Chọn dòng sản phẩm --</option>
                            <option value="01">Thời trang</option>
                            <option value="02">Hiện đại</option>
                            <option value="03">Sang trọng</option>
                            <option value="04">Thể thao</option>
                            <option value="05">Quân đội</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Bạn chưa chọn dòng sản phẩm!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Dây đeo</b></Form.Label>
                        <Form.Select
                            value={submitData.strapCode}
                            name='strapCode'
                            onChange={e => handleChangeData(e)}
                            isInvalid={isInvalid.strap}
                        >
                            <option hidden>-- Chọn dây đeo --</option>
                            <option value="01">Dây da</option>
                            <option value="02">Dây kim loại</option>
                            <option value="03">Dây cao su</option>
                            <option value="04">Dây vải</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Bạn chưa chọn dây đeo!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Mặt kính</b></Form.Label>
                        <Form.Select
                            value={submitData.glassCode}
                            name='glassCode'
                            onChange={e => handleChangeData(e)}
                            isInvalid={isInvalid.glass}
                        >
                            <option hidden>-- Chọn mặt kính --</option>
                            <option value="01">Kính khoáng Mineral (Kính cứng)</option>
                            <option value="02">Sapphire (Kính Chống Trầy)</option>
                            <option value="03">Resin Glass (Kính Nhựa)</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Bạn chưa chọn mặt kính!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Bộ máy</b></Form.Label>
                        <Form.Select
                            value={submitData.systemCode}
                            name='systemCode'
                            onChange={e => handleChangeData(e)}
                            isInvalid={isInvalid.system}
                        >
                            <option hidden>-- Chọn bộ máy --</option>
                            <option value="01">Cơ tự động (Automatic)</option>
                            <option value="02">Quartz (Pin)</option>
                            <option value="03">Eco-Drive (Năng Lượng Ánh Sáng)</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Bạn chưa chọn bộ máy!
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label><b>Mô tả</b></Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nhập mô tả sản phẩm"
                    as='textarea'
                    rows={3}
                    value={submitData.description}
                    name='description'
                    onChange={e => handleChangeData(e)}
                />
            </Form.Group>
        </Form>
    )

    return (
        <>
            <Button className='mb-1' variant="outline-primary" onClick={handleShow}>
                Thêm sản phẩm
            </Button>

            <Modal
                className='mt-3'
                show={show}
                onHide={handleClose}
                backdrop='static'
                size='lg'
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: '1000px' }}>
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

export default AddProductModal
