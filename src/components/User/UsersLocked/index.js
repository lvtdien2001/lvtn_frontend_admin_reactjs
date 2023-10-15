import { Table } from 'react-bootstrap';
import moment from 'moment';
import { UnLockAccountModal } from '..';

const UsersLocked = ({ users, setMessage, setReload }) => {

    let body = (
        <>
            <thead>
                <tr>
                    <th className='text-center'>STT</th>
                    <th className='text-center'>Email</th>
                    <th className='text-center'>Họ tên</th>
                    <th className='text-center'>Số điện thoại</th>
                    <th className='text-center'>Ngày tạo tài khoản</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users?.map((user, index) => {
                    return (
                        <tr key={index}>
                            <td className='text-center'>
                                {index + 1}
                            </td>
                            <td>{user.email}</td>
                            <td>{user.fullName}</td>
                            <td className='text-center'>
                                {user.phoneNumber}
                            </td>
                            <td className='text-center'>
                                {moment(user.createdAt).format('lll')}
                            </td>
                            <td className='text-center'>
                                <UnLockAccountModal
                                    userId={user._id}
                                    setMessage={setMessage}
                                    setReload={setReload}
                                />
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </>
    )

    return (
        <>
            <Table
                responsive
                size='sm'
                hover
                striped
                bordered
            >
                {body}
            </Table>
        </>
    )
}

export default UsersLocked
