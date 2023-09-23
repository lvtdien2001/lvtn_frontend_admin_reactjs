import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { UpdatePriceModal } from '..';

const TableOfInventories = ({ setMessage, formatPrice }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/product`);
            if (rsp.data.success) {
                setProducts(rsp.data.products);
                setLoading(false);
            }
        }
        fetchApi();
    }, [])

    let body = (
        !loading && products.map((product, index) => {
            return (
                <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>{product.name}</td>
                    <td className="text-center">{product.inventory}</td>
                    <td className='text-center text-danger'><b>{formatPrice(product.price)}</b></td>
                    <td style={{ minWidth: '100px' }} className="text-center">
                        <UpdatePriceModal
                            setMessage={setMessage}
                            product={product}
                            formatPrice={formatPrice}
                            setProducts={setProducts}
                            index={index}
                        />
                    </td>
                </tr>
            )
        })
    )

    return (
        <>
            {!loading && <>
                <Table size="sm" responsive bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>STT</th>
                            <th>Tên sản phẩm</th>
                            <th>Tồn kho</th>
                            <th>Đơn giá</th>
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
