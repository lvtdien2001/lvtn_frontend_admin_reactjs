import { useState, useEffect } from 'react';
import { Accordion, Button, Table } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './FilterProduct.module.scss';
import axios from 'axios';
import CustomToggle from './CustomToggle';

const cx = classNames.bind(styles);

const FilterProduct = ({ setProducts }) => {
    const [brands, setBrands] = useState([]);
    const [data, setData] = useState({
        brand: '', style: '', strap: '', glass: '', system: ''
    })

    const handleChange = (e) => {
        setData(prev => {
            return {
                ...prev,
                [e.target.id]: e.target.value
            }
        })
    }

    const handleFilter = () => {

    }

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/brand`);
                if (rsp.data.success) {
                    setBrands(rsp.data.brands);
                }
            } catch (error) {
                console.log(error.response?.message);
            }
        }
        fetchApi();
    }, [])

    let body = (
        <thead>
            <tr>
                <th>
                    <label>Thương hiệu:</label>
                    <select
                        id='brand'
                        className={`${cx('input')} ms-1`}
                        value={data.brand}
                        onChange={e => handleChange(e)}
                    >
                        <option hidden value="">-- Chọn thương hiệu --</option>
                        {brands.map(brand => {
                            return (
                                <option key={brand._id} value={brand._id}>{brand.name}</option>
                            )
                        })}
                    </select>
                </th>
                <th>
                    <label> Dòng sản phẩm:</label>
                    <select
                        id='style'
                        className={`${cx('input')} ms-1`}
                        value={data.style}
                        onChange={e => handleChange(e)}
                    >
                        <option hidden value="">-- Chọn dòng sản phẩm --</option>
                        <option value="01">Thời trang</option>
                        <option value="02">Hiện đại</option>
                        <option value="03">Sang trọng</option>
                        <option value="04">Thể thao</option>
                        <option value="05">Quân đội</option>
                    </select>
                </th>
                <th>
                    <label> Dây đeo:</label>
                    <select
                        id='strap'
                        className={`${cx('input')} ms-1`}
                        value={data.strap}
                        onChange={e => handleChange(e)}
                    >
                        <option hidden value="">-- Chọn dây đeo --</option>
                        <option value="01">Thời trang</option>
                        <option value="02">Hiện đại</option>
                        <option value="03">Sang trọng</option>
                        <option value="04">Thể thao</option>
                        <option value="05">Quân đội</option>
                    </select>
                </th>
                <th>
                    <label> Mặt kính:</label>
                    <select
                        id='glass'
                        className={`${cx('input')} ms-1`}
                        value={data.glass}
                        onChange={e => handleChange(e)}
                    >
                        <option hidden value="">-- Chọn mặt kính --</option>
                        <option value="01">Thời trang</option>
                        <option value="02">Hiện đại</option>
                        <option value="03">Sang trọng</option>
                        <option value="04">Thể thao</option>
                        <option value="05">Quân đội</option>
                    </select>
                </th>
                <th>
                    <label> Bộ máy:</label>
                    <select
                        id='system'
                        className={`${cx('input')} ms-1`}
                        value={data.system}
                        onChange={e => handleChange(e)}
                    >
                        <option hidden value="">-- Chọn bộ máy --</option>
                        <option value="01">Thời trang</option>
                        <option value="02">Hiện đại</option>
                        <option value="03">Sang trọng</option>
                        <option value="04">Thể thao</option>
                        <option value="05">Quân đội</option>
                    </select>
                </th>
                <th>
                    <Button variant='outline-success' onClick={handleFilter}>
                        Lọc
                    </Button>
                </th>
            </tr>
        </thead>
    )

    return (
        <Accordion>
            <CustomToggle eventKey="0">
                Bộ lọc <FaFilter />
            </CustomToggle>
            <Accordion.Collapse eventKey="0">
                <Table responsive size="sm">
                    {body}
                </Table>
            </Accordion.Collapse>
        </Accordion>
    );
}

export default FilterProduct
