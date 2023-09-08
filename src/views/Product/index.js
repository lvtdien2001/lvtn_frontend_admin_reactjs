import { useState } from 'react';
import { NavBar, TabBar, Message } from '../../components';
import { TableOfProducts, TableOfBrands } from '../../components/Products'

const Product = () => {
    const [message, setMessage] = useState({
        content: '', type: ''
    })
    const tabs = [
        {
            key: 'product',
            title: 'Danh mục sản phẩm',
            component: TableOfProducts
        },
        {
            key: 'brand',
            title: 'Quản lý thương hiệu',
            component: TableOfBrands
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

export default Product
