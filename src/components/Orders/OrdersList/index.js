import axios from 'axios';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PrintOrder, CancelOrder } from '..';

const OrdersList = ({ orders, formatPrice, setMessage, setReload }) => {

    const handleConfirm = async order => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/order/status/${order._id}`, { statusCode: '02' });
            setMessage({
                type: 'success',
                content: 'Xác nhận đơn hàng thành công'
            });
            setReload(prev => !prev);
        } catch (error) {
            setMessage({
                type: 'danger',
                content: error.response?.data.msg || error.message
            })
        }
    }

    const handleTransport = async order => {
        try {
            const data = {
                statusCode: '03',
                products: order.products
            }
            const rsp = await axios.put(`${process.env.REACT_APP_API_URL}/order/status/${order._id}`, data);
            setMessage({
                type: 'success',
                content: rsp.data.msg
            });
            setReload(prev => !prev);
        } catch (error) {
            setMessage({
                type: 'danger',
                content: error.response?.data.msg || error.message
            })
        }
    }

    const handleReceived = async order => {
        try {
            const rsp = await axios.put(`${process.env.REACT_APP_API_URL}/order/status/${order._id}`, { statusCode: '04' });
            setMessage({
                type: 'success',
                content: rsp.data.msg
            });
            setReload(prev => !prev);
        } catch (error) {
            setMessage({
                type: 'danger',
                content: error.response?.data.msg || error.message
            })
        }
    }

    let body = (
        <>
            {orders.map(order => {
                return (
                    <div className='mb-1' key={order._id}>
                        <ListGroup>
                            <ListGroup.Item className='text-end text-primary'>
                                <b>{order.status.name.toUpperCase()}</b>
                            </ListGroup.Item>

                            {order.products?.map(product => {
                                return (
                                    <ListGroup.Item as={Link} to={`/order/${order._id}`} key={product._id}>
                                        <Row>
                                            <Col className='text-end' lg={1}>
                                                <img alt='' src={product.imageUrl} width='60px' height='60px' />
                                            </Col>
                                            <Col>
                                                <span>{product.name}</span> <br />
                                                <span className='text-secondary'>x {product.quantity}</span>
                                            </Col>
                                            <Col className='text-end text-danger'>
                                                {formatPrice(product.price)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            })}

                            <ListGroup.Item className='text-end text-danger fs-5'>
                                <b>Tổng thanh toán: {formatPrice(order.totalAmount)}</b>
                            </ListGroup.Item>

                            <ListGroup.Item className='text-end'>
                                <PrintOrder order={order} formatPrice={formatPrice} />

                                {Number(order.status?.code) === 1 &&
                                    <Button className='ms-2' variant='success' onClick={() => handleConfirm(order)}>
                                        Xác nhận
                                    </Button>
                                }

                                {Number(order.status?.code) === 2 &&
                                    <Button className='ms-2' variant='success' onClick={() => handleTransport(order)}>
                                        Đã vận chuyển
                                    </Button>
                                }

                                {Number(order.status?.code) === 3 &&
                                    <Button className='ms-2' variant='success' onClick={() => handleReceived(order)}>
                                        Đã nhận hàng
                                    </Button>
                                }

                                {Number(order.status?.code) < 4 &&
                                    <CancelOrder order={order} setMessage={setMessage} setReload={setReload} />
                                }
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                )
            })}
        </>
    )

    return (
        <div style={{ minHeight: '404px' }}>
            {body}
        </div>
    )
}

export default OrdersList
