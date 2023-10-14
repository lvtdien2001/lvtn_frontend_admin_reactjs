import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { NavBar, Message, LoadingAnimation } from '../../components';
import { OrdersList, FilterOrders, Empty } from '../../components/Orders';

const Order = () => {
    const [message, setMessage] = useState({ content: '', type: '' });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [filter, setFilter] = useState('');

    const formatPrice = input => {
        const price = String(input);
        if (price.length <= 3) {
            return price + ' đ';
        }
        let priceFormat = [];
        for (let i = price.length; i > 0; i -= 3) {
            priceFormat.push(price.substring(i - 3, i));
        }
        return priceFormat.reverse().join('.') + ' đ';
    }

    useEffect(() => {
        const getOrders = async () => {
            try {
                let query;
                filter && (query = `statusCode=${filter}`);

                setLoading(true);
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/order?${query}`);
                setOrders(rsp.data.orders);
                setLoading(false);
            } catch (error) {
                setMessage({
                    type: 'danger',
                    content: error.response?.data.msg || error.message
                })
            }
        }
        getOrders();
    }, [reload, filter])

    return (
        <>
            <NavBar />
            <Container>
                <h3 className='text-center mt-3 mb-3'>QUẢN LÝ ĐƠN HÀNG</h3>
                {!loading && <FilterOrders filter={filter} setFilter={setFilter} />}
                {loading ? <LoadingAnimation /> :
                    (orders.length === 0 ? <Empty /> :
                        <OrdersList
                            orders={orders}
                            formatPrice={formatPrice}
                            setMessage={setMessage}
                            setReload={setReload}
                        />
                    )
                }
                {message.content && <Message type={message.type} message={message.content} setMessage={setMessage} />}
            </Container>
        </>
    )
}

export default Order
