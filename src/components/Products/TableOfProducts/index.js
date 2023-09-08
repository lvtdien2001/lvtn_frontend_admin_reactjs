import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { AddProductModal, DeleteProductModal, UpdateProductModal, FilterProduct } from '..';
import { Pagination } from '../..';
import axios from 'axios';

const TableOfProducts = ({ setMessage }) => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [filterData, setFilterData] = useState({});
    useEffect(() => {
        const fetchApi = async () => {
            try {
                let query = '';
                if (filterData.brand) query += `&brand=${filterData.brand}`;
                if (filterData.styleCode) query += `&styleCode=${filterData.styleCode}`;
                if (filterData.strapCode) query += `&strapCode=${filterData.strapCode}`;
                if (filterData.glassCode) query += `&glassCode=${filterData.glassCode}`;
                if (filterData.systemCode) query += `&systemCode=${filterData.systemCode}`;

                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/product?page=${page}${query}`);
                if (rsp.data.success) {
                    setProducts(rsp.data.products);
                    setPage(rsp.data.pagination.currentPage);
                    setLastPage(rsp.data.pagination.lastPage);
                    setLoading(false);
                }
            } catch (error) {
            }
        }
        fetchApi();
    }, [page, filterData])

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
            <AddProductModal brands={brands} setProducts={setProducts} setMessage={setMessage} />
            {!loading && <>
                <Table size="sm" responsive bordered hover>
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
                </Table>
                {lastPage > 1 && <Pagination page={page} lastPage={lastPage} setPage={setPage} />}
            </>}
        </>
    );
}

export default TableOfProducts
