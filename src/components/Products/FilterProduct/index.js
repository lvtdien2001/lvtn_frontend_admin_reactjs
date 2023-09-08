import { useState } from 'react';
import { Accordion, Button, Table } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './FilterProduct.module.scss';
import CustomToggle from './CustomToggle';

const cx = classNames.bind(styles);

const FilterProduct = ({ setFilterData, brands, setPage }) => {
    const [data, setData] = useState({
        brand: '', styleCode: '', strapCode: '', glassCode: '', systemCode: ''
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
        setFilterData({
            brand: data.brand,
            styleCode: data.styleCode,
            strapCode: data.strapCode,
            glassCode: data.glassCode,
            systemCode: data.systemCode
        });
        setPage(1);
    }

    let body = (
        <thead>
            <tr>
                <th style={{ width: '150px' }}>
                    <label>Thương hiệu:</label>
                    <select
                        id='brand'
                        className={`${cx('input')} ms-1`}
                        value={data.brand}
                        onChange={e => handleChange(e)}
                    >
                        <option value="">Tất cả</option>
                        {brands && brands.map(brand => {
                            return (
                                <option key={brand._id} value={brand._id}>{brand.name}</option>
                            )
                        })}
                    </select>
                </th>
                <th style={{ width: '150px' }}>
                    <label> Dòng sản phẩm:</label>
                    <select
                        id='styleCode'
                        className={`${cx('input')} ms-1`}
                        value={data.styleCode}
                        onChange={e => handleChange(e)}
                    >
                        <option value="">Tất cả</option>
                        <option value="01">Thời trang</option>
                        <option value="02">Hiện đại</option>
                        <option value="03">Sang trọng</option>
                        <option value="04">Thể thao</option>
                        <option value="05">Quân đội</option>
                    </select>
                </th>
                <th style={{ width: '150px' }}>
                    <label> Dây đeo:</label>
                    <select
                        id='strapCode'
                        className={`${cx('input')} ms-1`}
                        value={data.strapCode}
                        onChange={e => handleChange(e)}
                    >
                        <option value="">Tất cả</option>
                        <option value="01">Dây da</option>
                        <option value="02">Dây kim loại</option>
                        <option value="03">Dây cao su</option>
                        <option value="04">Dây vải</option>
                    </select>
                </th>
                <th style={{ width: '150px' }}>
                    <label> Mặt kính:</label>
                    <select
                        id='glassCode'
                        className={`${cx('input')} ms-1`}
                        value={data.glassCode}
                        onChange={e => handleChange(e)}
                    >
                        <option value="">Tất cả</option>
                        <option value="01">Kính khoáng Mineral (Kính cứng)</option>
                        <option value="02">Sapphire (Kính chống trầy)</option>
                        <option value="03">Resin Glass (Kính nhựa)</option>
                    </select>
                </th>
                <th style={{ width: '150px' }}>
                    <label> Bộ máy:</label>
                    <select
                        id='systemCode'
                        className={`${cx('input')} ms-1`}
                        value={data.systemCode}
                        onChange={e => handleChange(e)}
                    >
                        <option value="">Tất cả</option>
                        <option value="01">Cơ tự động (Automatic)</option>
                        <option value="02">Quartz (Pin)</option>
                        <option value="03">Eco-Drive (Năng lượng ánh sáng)</option>
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
