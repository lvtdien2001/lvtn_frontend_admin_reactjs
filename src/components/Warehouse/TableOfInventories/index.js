import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { UpdatePriceModal } from '..';
import { Pagination } from '../..';

const TableOfInventories = ({ setMessage, formatPrice }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/product?page=${page}`);
            if (rsp.data.success) {
                setProducts(rsp.data.products);
                setLastPage(rsp.data.pagination.lastPage);
                setLoading(false);
            }
        }
        fetchApi();
    }, [page])

    let body = (
        !loading && products.map((product, index) => {
            return (
                <tr key={index}>
                    <td className="text-center">{(page - 1) * 10 + index + 1}</td>
                    <td>{product.name}</td>
                    <td className='text-center'>
                        <img src={product.image.url} alt='Hinh anh san pham' width='75px' height='75px' />
                    </td>
                    <td className="text-center">{product.inventory}</td>
                    <td className='text-center text-danger'><b>{formatPrice(product.price)}</b></td>
                    <td style={{ minWidth: '100px' }} className="text-center">
                        <UpdatePriceModal
                            setMessage={setMessage}
                            product={product}
                            formatPrice={formatPrice}
                            setProducts={setProducts}
                            index={index}
                            page={page}
                        />
                    </td>
                </tr>
            )
        })
    )

    return (
        <>
            {!loading && <>
                <Pagination page={page} lastPage={lastPage} setPage={setPage} align='justify-content-center' />
                <Table size="sm" responsive bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>STT</th>
                            <th>Tên sản phẩm</th>
                            <th>Hình ảnh</th>
                            <th>Tồn kho</th>
                            <th>Đơn giá bán</th>
                            <th>Cập nhật đơn giá</th>
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

export default TableOfInventories
