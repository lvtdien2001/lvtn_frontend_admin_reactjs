import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { AddBrandModal, UpdateBrandModal, DeleteBrandModal } from '..';

const TableOfBrands = ({ setMessage }) => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/brand`)
            if (rsp.data.success) {
                setBrands(rsp.data.brands);
                setLoading(false);
            }
        }
        fetchApi();
    }, [])

    let body = (
        !loading && brands.map((brand, index) => {
            return (
                <tr key={index}>
                    <td className='text-center'>{index + 1}</td>
                    <td className='text-center'>{brand.name}</td>
                    <td className='text-center'>
                        <img src={brand.logo.url} alt="Hinh anh thuong hieu" height='45px' width='200px' />
                    </td>
                    <td className='text-center'>
                        <UpdateBrandModal brand={brand} setMessage={setMessage} setBrands={setBrands} />
                        <DeleteBrandModal brandId={brand._id} setMessage={setMessage} setBrands={setBrands} />
                    </td>
                </tr>
            )
        })
    )

    return (
        <>
            <AddBrandModal setBrands={setBrands} setMessage={setMessage} />
            <Table size="sm" responsive bordered hover>
                <thead>
                    <tr className="text-center">
                        <th>STT</th>
                        <th>Tên thương hiệu</th>
                        <th>Logo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </Table>
        </>
    )
}

export default TableOfBrands
