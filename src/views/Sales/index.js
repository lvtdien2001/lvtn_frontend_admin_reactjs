import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { NavBar, Message, LoadingAnimation } from '../../components';
import { Chart, Filter } from '../../components/Sales';
import axios from 'axios';

const Sales = () => {
    const [message, setMessage] = useState({ content: '', type: '' });
    const date = new Date();
    const [filter, setFilter] = useState({
        year: date.getFullYear(),
        month: ''
    });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

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
        const fetchApi = async () => {
            try {
                let query = `isPayment=true&year=${filter.year}`;
                filter.month && (query += `&month=${filter.month}`);

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
        fetchApi();
    }, [filter])

    useEffect(() => { document.title = 'Thống kê doanh thu' }, []);

    return (
        <>
            <NavBar />
            <Container className='bg-light p-1'>
                <h3 className='text-center mt-3 mb-3'>THỐNG KÊ DOANH THU</h3>
                {!loading && <Filter setFilter={setFilter} filter={filter} />}
                {loading ? <LoadingAnimation /> :
                    <Chart
                        orders={orders}
                        filter={filter}
                        formatPrice={formatPrice}
                    />
                }
                {message.content && <Message
                    type={message.type}
                    message={message.content}
                    setMessage={setMessage}
                />}
            </Container>
        </>
    )
}

export default Sales
