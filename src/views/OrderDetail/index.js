import { useState, useEffect } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import axios from 'axios';
import moment from 'moment';
import classNames from 'classnames/bind';
import styles from './OrderDetail.module.scss';
import { LoadingAnimation, NavBar } from '../../components';

const cx = classNames.bind(styles);

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);

    const formatPrice = input => {
        const price = String(input);
        if (price.length <= 3) {
            return price + ' đ';
        }
        let priceFormat = [];
        for (let i = price.length; i > 0; i -= 3) {
            priceFormat.push(price.substring(i - 3, i));
        }
        return priceFormat.reverse().join('.') + ' đ';
    }

    useEffect(() => {
        const getOrder = async () => {
            setLoading(true);
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/order/${id}`);
                setOrder(rsp.data.order);
                setLoading(false);
            } catch (error) { }
        }

        getOrder();
    }, [id]);

    useEffect(() => { document.title = 'Chi tiết đơn hàng' }, []);

    let status = (
        <>
            <Row className={`text-center ${cx('status')}`}>
                <Col className={Number(order.status?.code) >= 1 ? 'text-success' : 'text-secondary'}>
                    Chờ xác nhận
                </Col>
                <Col className={Number(order.status?.code) >= 2 ? 'text-success' : 'text-secondary'}>
                    Chờ lấy hàng
                </Col>
                <Col className={Number(order.status?.code) >= 3 ? 'text-success' : 'text-secondary'}>
                    Đang vận chuyển
                </Col>
                <Col className={Number(order.status?.code) >= 4 ? 'text-success' : 'text-secondary'}>
                    Đã nhận
                </Col>
            </Row>

            <Row className={`text-center mb-3 ${cx('status')}`}>
                <Col className={Number(order.status?.code) >= 1 ? 'text-success' : 'text-secondary'}>
                    {Number(order.status?.code) >= 1 ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                    <div className={`${Number(order.status?.code) >= 1 ? 'bg-success' : 'bg-secondary'} ${cx('progress-bar')}`}></div>
                </Col>
                <Col className={Number(order.status?.code) >= 2 ? 'text-success' : 'text-secondary'}>
                    {Number(order.status?.code) >= 2 ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                    <div className={`${Number(order.status?.code) >= 2 ? 'bg-success' : 'bg-secondary'} ${cx('progress-bar')}`}></div>
                </Col>
                <Col className={Number(order.status?.code) >= 3 ? 'text-success' : 'text-secondary'}>
                    {Number(order.status?.code) >= 3 ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                    <div className={`${Number(order.status?.code) >= 3 ? 'bg-success' : 'bg-secondary'} ${cx('progress-bar')}`}></div>
                </Col>
                <Col className={Number(order.status?.code) >= 4 ? 'text-success' : 'text-secondary'}>
                    {Number(order.status?.code) >= 4 ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                    <div className={`${Number(order.status?.code) >= 4 ? 'bg-success' : 'bg-secondary'} ${cx('progress-bar')}`}></div>
                </Col>
            </Row>
        </>
    )

    let cancel = (
        <>
            <Row className='fs-5 text-danger mb-3'>
                <Col>
                    Trạng thái đơn hàng: {order.status?.name}<br />
                    Lý do: {order.cancelReason}
                </Col>
            </Row>
        </>
    )

    let body = (
        <>
            {Number(order.status?.code) < 5 ? status : cancel}
            <p>
                <b>Tên khách hàng: </b>
                <>{order.address?.fullName}</>
            </p>
            <p>
                <b>Địa chỉ nhận hàng: </b>
                <>{order.address?.description}, {order.address?.ward}, {order.address?.district}, {order.address?.province}</>
            </p>
            <p>
                <b>Thời gian đặt hàng: </b>
                <>{moment(order.createdAt).format('llll')}</>
            </p>

            <Table hover responsive size='sm'>
                <thead>
                    <tr>
                        <th className='text-center'>STT</th>
                        <th style={{ minWidth: '130px' }} className='text-center'>Tên sản phẩm</th>
                        <th className='text-center'>Hình ảnh</th>
                        <th style={{ minWidth: '130px' }} className='text-center'>Đơn giá</th>
                        <th style={{ minWidth: '80px' }} className='text-center'>Số lượng</th>
                        <th style={{ minWidth: '130px' }} className='text-center'>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {order.products?.map((product, index) => {
                        return (
                            <tr key={index}>
                                <td className='text-center'>{index + 1}</td>
                                <td>{product.name}</td>
                                <td className='text-center'>
                                    <img alt='' src={product.imageUrl} width='70px' height='70px' />
                                </td>
                                <td className='text-center'>{formatPrice(product.price)}</td>
                                <td className='text-center'>{product.quantity}</td>
                                <td className='text-center'><b>{formatPrice(product.price * product.quantity)}</b></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <p className='text-end text-danger me-2'><b>Tổng thanh toán: {formatPrice(order.totalAmount)}</b></p>
            <p className='text-end me-2'><b>Phương thức thanh toán: {order.paymentMethod?.name}</b></p>
        </>
    )

    return (
        <>
            <NavBar />
            <Container className={`mt-3 ${cx('wrapper')}`} >
                <h3 className='text-center'>CHI TIẾT ĐƠN HÀNG</h3>
                <div className='ms-2 text-primary mb-3 fs-5'>
                    <b style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>&#8617; Quay lại</b>
                </div>
                {loading ? <LoadingAnimation /> : body}
            </Container>
        </>
    )
}

export default OrderDetail
