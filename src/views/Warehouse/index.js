import { useState, useEffect } from 'react';
import { NavBar, TabBar, Message } from '../../components';
import { TableOfGoodsReceivedNotes, TableOfSuppliers, TableOfInventories } from '../../components/Warehouse';

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
            title: 'Hàng tồn kho và Đơn giá',
            component: TableOfInventories
        },
        {
            key: 'supplier',
            title: 'Nhà cung cấp',
            component: TableOfSuppliers
        }
    ]

    useEffect(() => { document.title = 'Quản lý kho hàng' }, []);

    return (
        <>
            <NavBar />
            <TabBar tabs={tabs} setMessage={setMessage} />
            {message.content && <Message type={message.type} message={message.content} setMessage={setMessage} />}
        </>
    )
}

export default Warehouse
