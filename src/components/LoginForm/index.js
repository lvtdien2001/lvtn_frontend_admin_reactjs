import { useState, useContext } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa';
import { TbLock } from 'react-icons/tb';
import classNames from 'classnames/bind';
import styles from './LoginForm.module.scss';
import { AuthContext } from '../../contexts';
import { Message } from '..';

const cx = classNames.bind(styles);

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.length < 5) {
            setIsInvalidEmail(true);
        } else if (password.length < 5) {
            setIsInvalidPassword(true);
        } else {
            try {
                const loginData = await login(email, password);
                if (!loginData.success) {
                    setMessage(loginData.msg);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <div className={`${cx('wrapper')}`}>
                {message && <Message type='danger' message={message} title='Đăng nhập thất bại!' setMessage={setMessage} />}
                <Form className={cx('form')} style={{ width: '350px' }}>
                    <h2 className='text-center text-primary'>ĐĂNG NHẬP</h2>
                    <InputGroup hasValidation className="mb-3">
                        <InputGroup.Text id="basic-addon1"><FaUserAlt /></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên tài khoản"
                            value={email}
                            onChange={e => { setEmail(e.target.value); setIsInvalidEmail(false); }}
                            required
                            isInvalid={isInvalidEmail}
                        />
                        <Form.Control.Feedback className='text-end' type="invalid">
                            Tên tài khoản phải có ít nhất 5 ký tự
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><TbLock /></InputGroup.Text>
                        <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={e => { setPassword(e.target.value); setIsInvalidPassword(false) }}
                            required
                            isInvalid={isInvalidPassword}
                        />
                        <Form.Control.Feedback className='text-end' type="invalid">
                            Mật khẩu phải có ít nhất 5 ký tự
                        </Form.Control.Feedback>
                    </InputGroup>
                    <Button
                        onClick={e => handleSubmit(e)}
                        variant="primary"
                        type="submit"
                        style={{ width: '100%' }}
                    >
                        Đăng nhập
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default LoginForm
