import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { NavBar, Message, LoadingAnimation, Pagination } from '../../components';
import { UsersList, UsersLocked } from '../../components/User';
import axios from 'axios';

const User = () => {
    const [message, setMessage] = useState({ type: '', content: '' });
    const [users, setUsers] = useState([]);
    const [usersLocked, setUsersLocked] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
                let query = `page=${page}`

                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/user?${query}`);
                setUsers(rsp.data.users);
                setUsersLocked(rsp.data.usersLocked);
                setLastPage(rsp.data.pagination?.lastPage);
                setLoading(false);
            } catch (error) {
                setMessage({
                    type: 'danger',
                    content: error.response?.data.msg || error.message
                })
            }
        }

        getUsers();
    }, [page, reload])

    return (
        <>
            <NavBar />
            <Container className='bg-light p-1'>
                <h4 className='text-center mt-3 mb-3'>QUẢN LÝ TÀI KHOẢN</h4>
                {loading ? <LoadingAnimation /> :
                    <UsersList
                        users={users}
                        setMessage={setMessage}
                        setReload={setReload}
                    />
                }
                {page > 1 &&
                    <Pagination
                        page={page}
                        lastPage={lastPage}
                        setPage={setPage}
                        align='justify-content-center'
                    />
                }

                <h5 className='text-center mt-3'>TÀI KHOẢN BỊ KHÓA</h5>
                {loading ? <LoadingAnimation /> :
                    <UsersLocked
                        users={usersLocked}
                        setMessage={setMessage}
                        setReload={setReload}
                    />
                }
            </Container>
            {message.content &&
                <Message
                    setMessage={setMessage}
                    message={message.content}
                    type={message.type}
                />
            }
        </>
    )
}

export default User
