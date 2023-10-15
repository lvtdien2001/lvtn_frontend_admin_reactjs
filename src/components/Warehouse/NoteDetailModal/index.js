import { useState, useRef } from 'react';
import { Button, Modal, Row, Col, Table } from 'react-bootstrap';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';

const NoteDetailModal = ({ note, formatPrice }) => {
    const [show, setShow] = useState(false);
    const ref = useRef();

    const handlePrint = useReactToPrint({
        content: () => ref.current,
        documentTitle: `PhieuNhapKho${note.createdAt}`,
        onAfterPrint: () => handleClose()
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let body = (
        <>
            <h4 className='text-center'>PHIẾU NHẬP KHO</h4>
            <Row className='mb-3'>
                <Col xs={3}></Col>
                <Col className='text-center'>
                    Ngày {moment(note.createdAt).date()} tháng {moment(note.createdAt).month() + 1}  năm {moment(note.createdAt).year()}
                </Col>
                <Col xs={3}>Số: . . . . . . . . . . . . .</Col>
            </Row>

            <Table size="sm" responsive bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Nhà cung cấp</th>
                        <th>SL</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {note.products.map((product, index) => {
                        return (
                            <tr key={index}>
                                <td className='text-center'>{index + 1}</td>
                                <td>{product.product.name}</td>
                                <td>{product.supplier.name}</td>
                                <td className='text-center'>{product.quantity}</td>
                                <td style={{ minWidth: '90px' }} className='text-center'>{formatPrice(product.price)}</td>
                                <td style={{ minWidth: '115px' }} className='text-center'><b>{formatPrice(product.amount)}</b></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <p className='text-end'>
                <b className='text-danger'>Tổng cộng: {formatPrice(note.totalAmount)}</b>
            </p>

            <Row style={{ minHeight: '150px' }}>
                <Col className='text-center'>
                    <b>Người lập phiếu</b><br />
                    (Ký, họ tên)
                </Col>
                <Col className='text-center'>
                    <b>Thủ kho</b><br />
                    (Ký, họ tên)
                </Col>
                <Col className='text-center'>
                    <b>Kế toán</b><br />
                    (Ký, họ tên)
                </Col>
            </Row>
        </>
    )

    return (
        <>
            <Button size='sm' className='mb-2' variant="outline-success" onClick={handleShow}>
                Xem chi tiết
            </Button>

            <Modal scrollable style={{ minWidth: '775px' }} size='lg' className='mt-3' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Thông tin chi tiết phiếu nhập kho
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className='p-3' ref={ref}>
                    {body}
                </Modal.Body>

                <Modal.Footer className='justify-content-center'>
                    <Button variant="outline-success" onClick={handlePrint}>
                        In phiếu nhập kho
                    </Button>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NoteDetailModal;