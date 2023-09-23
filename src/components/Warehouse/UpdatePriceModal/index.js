import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Row, Col, Accordion } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import moment from 'moment';
import 'moment/locale/vi';

const UpdatePriceModal = ({ setMessage, setProducts, product, formatPrice, index }) => {
    const [show, setShow] = useState(false);
    const [price, setPrice] = useState(product.price);
    const [prices, setPrices] = useState([]);
    const [receivedNotes, setReceivedNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isInvalid, setIsInvalid] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async e => {
        e?.preventDefault();
        if (price < 10000) {
            setIsInvalid(true);
        } else {
            try {
                const data = { value: price, productId: product._id }
                const rsp = await axios.post(`${process.env.REACT_APP_API_URL}/price`, data);
                if (rsp.data.success) {
                    setPrice(rsp.data?.newPrice.value);
                    setMessage({
                        type: 'success',
                        content: rsp.data.msg
                    });
                    setProducts(prev => {
                        let products = prev;
                        products[index].price = rsp.data?.newPrice.value;
                        return products;
                    })
                    handleClose();
                    setPrices(prev => [rsp.data?.newPrice, ...prev]);
                }
            } catch (error) {
                setMessage({
                    type: 'danger',
                    content: error.response?.data.msg || error.message
                })
            }
        }
    }

    useEffect(() => {
        const getPrices = async () => {
            const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/price?productId=${product._id}`);
            if (rsp.data?.success) {
                setPrices(rsp.data.prices);
            }
        }
        const getReceivedNotes = async () => {
            setLoading(true);
            const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/goods-received-note?productId=${product._id}`);
            if (rsp.data?.success) {
                setReceivedNotes(rsp.data.goodsReceivedNotes);
                setLoading(false);
            }
        }
        getPrices();
        getReceivedNotes();
    }, [])

    let history = (
        <Table size="sm" responsive bordered hover>
            <thead>
                <tr className="text-center">
                    <th>STT</th>
                    <th>Đơn giá</th>
                    <th>Thời gian</th>
                </tr>
            </thead>
            <tbody>
                {!loading && prices.map((price, index) => {
                    return (
                        <tr key={index}>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center text-danger'><b>{formatPrice(price.value)}</b></td>
                            <td className='text-center'>{moment(price.createdAt).format('llll')}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )

    let pricesPurchased = (
        <Table size="sm" responsive bordered hover>
            <thead>
                <tr className="text-center">
                    <th>STT</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thời gian</th>
                </tr>
            </thead>
            <tbody>
                {!loading && receivedNotes.map((note, index) => {
                    const detail = note.products?.find(element => element.product === product._id);
                    return (
                        <tr key={index}>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center text-danger'><b>{formatPrice(detail?.price)}</b></td>
                            <td className='text-center'>{detail?.quantity}</td>
                            <td className='text-center'>{moment(note.createdAt).format('llll')}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )

    let body = (
        <>
            <h6>{product.name}</h6>
            <Row>
                <Col className='text-center'>
                    <img src={product.image.url} width='75px' height='75px' />
                </Col>
                <Col>
                    <Form onSubmit={e => handleSubmit(e)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Đơn giá:</Form.Label>
                            <Form.Control
                                autoFocus
                                type="number"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                isInvalid={isInvalid}
                            />
                            <Form.Control.Feedback type="invalid">
                                Đơn giá thấp nhất là 10.000 đ
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Đơn giá nhập vào</Accordion.Header>
                    <Accordion.Body>
                        {pricesPurchased}
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Lịch sử cập nhật đơn giá</Accordion.Header>
                    <Accordion.Body>
                        {history}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )

    return (
        <>
            <Button variant="outline-success" onClick={handleShow}>
                <BsPencilSquare />
            </Button>

            <Modal
                className='mt-3'
                show={show}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật đơn giá</Modal.Title>
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

export default UpdatePriceModal;