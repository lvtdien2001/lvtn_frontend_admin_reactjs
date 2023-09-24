import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { BsFillTrashFill } from 'react-icons/bs';

const AddGoodsReceivedNoteModal = ({ setMessage, formatPrice, setNotes }) => {
    const [show, setShow] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);

    const [productsSelected, setProductsSelected] = useState([]);
    const [currentProduct, setCurrentProduct] = useState({
        product: '', supplier: '', price: 0, quantity: 0, amount: 0
    });
    const [isInvalid, setIsInvalid] = useState({
        product: false, supplier: false, price: false, quantity: false
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const resetForm = () => {
        setCurrentProduct({
            product: '', supplier: '', price: 0, quantity: 0, amount: 0
        });
        setIsInvalid({
            product: false, supplier: false, price: false, quantity: false
        })
    }

    const resetData = () => {
        resetForm();
        setProductsSelected([]);
    }

    const handleAddProduct = () => {
        const { product, supplier, price, quantity } = currentProduct;
        if (product === '' || supplier === '' || price < 10000 || quantity === 0) {
            setIsInvalid({
                product: product === '',
                supplier: supplier === '',
                price: (price) < 10000,
                quantity: quantity === 0
            })
        } else {
            setProductsSelected(prev => [...prev, currentProduct]);
            resetForm();
        }
    }

    const handleRemoveProduct = index => setProductsSelected(prev => prev.splice(index, 1))

    const handleSubmit = async () => {
        if (productsSelected.length === 0) {
            setMessage({
                type: 'danger',
                content: 'Bạn chưa thêm sản phẩm vào phiếu'
            });
            return;
        }
        try {
            const rsp = await axios.post(`${process.env.REACT_APP_API_URL}/goods-received-note`, { products: productsSelected });
            if (rsp.data.success) {
                setNotes(prev => [rsp.data.newGoodsReceivedNote, ...prev]);
                setMessage({
                    type: 'success',
                    content: rsp.data.msg
                })
            }
        } catch (error) {
            setMessage({
                type: 'danger',
                content: error.response.data?.msg || error.message
            })
        }
        handleClose();
        resetData();
    }

    useEffect(() => {
        const getProducts = async () => {
            const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/product`);
            if (rsp.data?.success) {
                setProducts(rsp.data.products);
            }
        }
        const getSuppliers = async () => {
            const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/supplier`);
            if (rsp.data?.success) {
                setSuppliers(rsp.data.suppliers);
            }
        }

        getProducts();
        getSuppliers();
    }, [])

    let form = (
        <>
            <Form.Group className="mb-3">
                <Form.Label><b>Sản phẩm</b></Form.Label>
                <Form.Select
                    value={currentProduct.product}
                    onChange={e => setCurrentProduct(prev => { return { ...prev, product: e.target.value } })}
                    isInvalid={isInvalid.product}
                >
                    <option hidden>Chọn sản phẩm</option>
                    {products.map(product => {
                        return (
                            <option
                                disabled={productsSelected.find(selected => product._id === selected.product)}
                                key={product._id}
                                value={product._id}
                            >
                                {product.name}
                            </option>
                        )
                    })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    Bạn chưa chọn sản phẩm
                </Form.Control.Feedback>
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Nhà cung cấp</b></Form.Label>
                        <Form.Select
                            value={currentProduct.supplier}
                            onChange={e => setCurrentProduct(prev => { return { ...prev, supplier: e.target.value } })}
                            isInvalid={isInvalid.supplier}
                        >
                            <option hidden>Chọn nhà cung cấp</option>
                            {suppliers.map(supplier => {
                                return (
                                    <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
                                )
                            })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Bạn chưa chọn sản phẩm
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col xs={3}>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Đơn giá nhập</b></Form.Label>
                        <Form.Control
                            type="number"
                            value={currentProduct.price}
                            onChange={e => setCurrentProduct(prev => {
                                return { ...prev, price: e.target.value, amount: prev.quantity * e.target.value }
                            })}
                            isInvalid={isInvalid.price}
                        />
                        <Form.Control.Feedback type="invalid">
                            Đơn giá thấp nhất là 10.000 đ
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col xs={3}>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Số lượng</b></Form.Label>
                        <Form.Control
                            type="number"
                            value={currentProduct.quantity}
                            onChange={e => setCurrentProduct(prev => {
                                return { ...prev, quantity: e.target.value, amount: prev.price * e.target.value }
                            })}
                            isInvalid={isInvalid.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                            Số lượng phải lớn hơn 0
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Button variant='outline-primary' onClick={handleAddProduct}>Thêm sản phẩm vào danh sách</Button>
        </>
    )

    let productsList = (
        <>
            <h5 className='text-center'>Danh sách sản phẩm</h5>
            <Table size="sm" responsive bordered hover>
                <thead>
                    <tr className="text-center">
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Nhà cung cấp</th>
                        <th>Đơn giá nhập</th>
                        <th>Số lượng</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productsSelected.length === 0 ? <tr className='text-center'><td colSpan={6}>Chưa có sản phẩm</td></tr> :
                        productsSelected.map((productSelected, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-center'>{index + 1}</td>
                                    <td>{(products.find(product => product._id === productSelected.product))?.name}</td>
                                    <td>{(suppliers.find(supplier => supplier._id === productSelected.supplier))?.name}</td>
                                    <td className='text-center text-danger'><b>{formatPrice(productSelected.price)}</b></td>
                                    <td className='text-center'>{productSelected.quantity}</td>
                                    <td className='text-center'>
                                        <Button variant='outline-danger' onClick={() => handleRemoveProduct(index)}>
                                            <BsFillTrashFill />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )

    return (
        <>
            <Button className='mb-1' variant="outline-primary" onClick={handleShow}>
                Tạo phiếu nhập kho
            </Button>

            <Modal
                className='mt-3'
                show={show}
                onHide={handleClose}
                backdrop='static'
                size='xl'
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tạo phiếu nhập kho</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                    {productsList}
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

export default AddGoodsReceivedNoteModal
