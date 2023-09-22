import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { AddSupplierModal, UpdateSupplierModal, DeleteSupplierModal } from '..';

const TableOfSuppliers = ({ setMessage, formatPrice }) => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/supplier`);
                if (rsp.data.success) {
                    setSuppliers(rsp.data.suppliers);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error.response?.message);
            }
        }
        fetchApi();
    }, [])

    let body = (
        !loading && suppliers.map((supplier, index) => {
            return (
                <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>{supplier.name}</td>
                    <td className="text-center">{supplier.code}</td>
                    <td>{supplier.address}</td>
                    <td style={{ minWidth: '100px' }} className="text-center">
                        <UpdateSupplierModal supplier={supplier} setMessage={setMessage} setSuppliers={setSuppliers} />
                        <DeleteSupplierModal supplierId={supplier._id} setMessage={setMessage} setSuppliers={setSuppliers} />
                    </td>
                </tr>
            )
        })
    )

    return (
        <>
            <AddSupplierModal setSuppliers={setSuppliers} setMessage={setMessage} />
            {!loading && <>
                <Table size="sm" responsive bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>STT</th>
                            <th>Tên nhà cung cấp</th>
                            <th>Mã code</th>
                            <th>Địa chỉ</th>
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

export default TableOfSuppliers
