import { useEffect, useState } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { AddProductModal, DeleteProductModal, UpdateProductModal, FilterProduct } from '..';
import { Pagination, LoadingAnimation } from '../..';
import axios from 'axios';

const TableOfProducts = ({ setMessage }) => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [filterData, setFilterData] = useState({});
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                let query = '';
                if (filterData.brand) query += `&brand=${filterData.brand}`;
                if (filterData.styleCode) query += `&styleCode=${filterData.styleCode}`;
                if (filterData.strapCode) query += `&strapCode=${filterData.strapCode}`;
                if (filterData.glassCode) query += `&glassCode=${filterData.glassCode}`;
                if (filterData.systemCode) query += `&systemCode=${filterData.systemCode}`;

                setLoading(true);
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/product?page=${page}${query}`);
                if (rsp.data.success) {
                    setProducts(rsp.data.products);
                    setLastPage(rsp.data.pagination.lastPage);
                    setLoading(false);
                }
            } catch (error) {
            }
        }
        fetchApi();
    }, [page, filterData, reload])

    useEffect(() => {
        const fetchApi = async () => {
            const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/brand`);
            if (rsp.data.success) {
                setBrands(rsp.data.brands)
            }
        }
        fetchApi();
    }, [])

    let body = (
        !loading && products.map((product, index) => {
            return (
                <tr key={index}>
                    <td className="text-center">{(page - 1) * 12 + index + 1}</td>
                    <td style={{ maxWidth: '450px' }}>{product.name}</td>
                    <td className="text-center">
                        <img src={product.image?.url} alt='Hinh anh san pham' width='80px' height='80px' />
                    </td>
                    <td className='text-center'>{product.gender === 0 ? 'Cặp đôi' : (product.gender === 1 ? 'Nam' : 'Nữ')}</td>
                    <td className='text-center'>{product.brand?.name}</td>
                    <td style={{ minWidth: '200px' }}>
                        - Dòng sản phẩm: {product.style?.name} <br />
                        - Dây đeo: {product.strap?.name} <br />
                        - Mặt kính: {product.glass?.name} <br />
                        - Bộ máy: {product.system?.name} <br />
                    </td>
                    <td style={{ minWidth: '100px' }} className="text-center">
                        <UpdateProductModal brands={brands} setProducts={setProducts} setMessage={setMessage} product={product} />
                        <DeleteProductModal setProducts={setProducts} setMessage={setMessage} productId={product._id} />
                    </td>
                </tr>
            )
        })
    )

    return (
        <>
            <FilterProduct brands={brands} setFilterData={setFilterData} setPage={setPage} />
            <Row className='justify-content-between'>
                <Col lg={6} xs={12}>
                    <AddProductModal
                        setReload={setReload}
                        brands={brands}
                        setProducts={setProducts}
                        setMessage={setMessage}
                        setLoading={setLoading}
                    />
                </Col>
                <Col>
                    {lastPage > 1 && <Pagination page={page} lastPage={lastPage} setPage={setPage} align='justify-content-end' />}
                </Col>
            </Row>
            {loading ? <LoadingAnimation /> : <>
                <Table size="sm" responsive bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>STT</th>
                            <th>Tên sản phẩm</th>
                            <th>Hình ảnh</th>
                            <th>Giới tính</th>
                            <th>Thương hiệu</th>
                            <th>Thông số kỹ thuật</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </Table>
            </>}
        </>
    );
}

export default TableOfProducts
