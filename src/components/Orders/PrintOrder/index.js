import { useState, useRef } from 'react';
import { Button, Modal, Table, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';

function PrintOrder({ order, formatPrice }) {
    const [show, setShow] = useState(false);
    const ref = useRef();

    const handlePrint = useReactToPrint({
        content: () => ref.current,
        documentTitle: `DonHang${order.createdAt}`,
        onAfterPrint: () => handleClose()
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let body = (
        <>
            <h4 className='text-center'>ĐƠN HÀNG</h4>
            <div className='text-center mb-3'>
                Thời gian đặt hàng: {moment(order.createdAt).format('llll')}
            </div>

            <div className='mb-2'>Mã đơn hàng: {order._id}</div>
            <div className='mb-2'>Tên khách hàng: {order.address?.fullName}</div>
            <div className='mb-2'>Số điện thoại: {order.address?.phoneNumber}</div>
            <div className='mb-2'>
                Địa chỉ nhận hàng: {order.address?.description}, {order.address?.ward}, {order.address?.district}, {order.address?.province}
            </div>

            <Table size="sm" responsive bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>SL</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {order.products.map((product, index) => {
                        return (
                            <tr key={index}>
                                <td className='text-center'>{index + 1}</td>
                                <td>{product.name}</td>
                                <td className='text-center'>{product.quantity}</td>
                                <td style={{ minWidth: '90px' }} className='text-center'>{formatPrice(product.price)}</td>
                                <td style={{ minWidth: '115px' }} className='text-center'><b>{formatPrice(product.price * product.quantity)}</b></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <p className='text-end'>
                <b className='text-danger'>Tổng cộng: {formatPrice(order.totalAmount)}</b>
            </p>

            <p className='text-end'>
                <b>Phương thức thanh toán: {order.paymentMethod?.name}</b>
            </p>

            <Row style={{ minHeight: '150px' }}>
                <Col className='text-center'>
                    <b>Người lập phiếu</b><br />
                    (Ký, họ tên)
                </Col>
                <Col className='text-center'>
                    <b>Người giao hàng</b><br />
                    (Ký, họ tên)
                </Col>
                <Col className='text-center'>
                    <b>Người nhận hàng</b><br />
                    (Ký, họ tên)
                </Col>
            </Row>
        </>
    )

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                In hóa đơn
            </Button>

            <Modal size='lg' className='mt-3' show={show} onHide={handleClose}>
                <Modal.Body className='p-3' ref={ref}>
                    {body}
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="outline-success" onClick={handlePrint}>
                        In đơn hàng
                    </Button>
                    <Button variant="outline-danger" onClick={handleClose}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PrintOrder;