import { useState } from 'react';
import { NavBar, TabBar, Message } from '../../components';
import { TableOfGoodsReceivedNotes, TableOfSuppliers } from '../../components/Warehouse';
import { TableOfBrands } from '../../components/Brands';

const Warehouse = () => {
    const [message, setMessage] = useState({
        content: '', type: ''
    })
    const tabs = [
        {
            key: 'goods-received-note',
            title: 'Phiếu nhập kho',
            component: TableOfGoodsReceivedNotes
        },
        {
            key: 'inventory',
            title: 'Hàng tồn kho',
            component: TableOfBrands
        },
        {
            key: 'supplier',
            title: 'Nhà cung cấp',
            component: TableOfSuppliers
        }
    ]

    return (
        <>
            <NavBar />
            <TabBar tabs={tabs} setMessage={setMessage} />
            {message.content && <Message type={message.type} message={message.content} setMessage={setMessage} />}
        </>
    )
}

export default Warehouse
