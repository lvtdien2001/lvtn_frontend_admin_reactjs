import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { AddProductModal, DeleteProductModal, UpdateProductModal, FilterProduct } from '..'
import axios from 'axios';

const TableOfProducts = ({ setMessage }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/product`);
                if (rsp.data.success) {
                    setProducts(rsp.data.products);
                    setLoading(false);
                }
            } catch (error) {
            }
        }
        fetchApi();
    }, [])

    let body = (
        !loading && products.map((product, index) => {
            return (
                <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td style={{ maxWidth: '450px' }}>{product.name}</td>
                    <td className="text-center">
                        <img src={product.image?.url} alt='Hinh anh san pham' width='100px' height='100px' />
                    </td>
                    <td>{product.brand?.name}</td>
                    <td style={{ minWidth: '200px' }}>
                        - Dòng sản phẩm: {product.style?.name} <br />
                        - Dây đeo: {product.strap?.name} <br />
                        - Mặt kính: {product.glass?.name} <br />
                        - Bộ máy: {product.system?.name} <br />
                    </td>
                    <td style={{ minWidth: '100px' }} className="text-center">
                        <UpdateProductModal setProducts={setProducts} setMessage={setMessage} product={product} />
                        <DeleteProductModal setProducts={setProducts} setMessage={setMessage} productId={product._id} />
                    </td>
                </tr>
            )
        })
    )

    return (
        <>
            <FilterProduct setProducts={setProducts} />
            <AddProductModal setProducts={setProducts} setMessage={setMessage} />
            {!loading && <Table size="sm" responsive bordered hover>
                <thead>
                    <tr className="text-center">
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Hình ảnh</th>
                        <th>Thương hiệu</th>
                        <th>Thông số kỹ thuật</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </Table>}
        </>
    );
}

export default TableOfProducts
