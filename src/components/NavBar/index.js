import { useContext } from 'react';
import { Button, Dropdown, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { GiExitDoor } from 'react-icons/gi';
import { AuthContext } from '../../contexts';
import styles from './NavBar.module.scss';

const cx = classNames.bind(styles);

const NavBar = () => {
    const { logout } = useContext(AuthContext);
    return (
        <Row className={`${cx('nav')} justify-content-around`}>
            <Col xs={7} lg={6}>
                <Dropdown>
                    <Dropdown.Toggle variant="primary">
                        Quản lý
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Link className={cx('text-link')} to='/product'>
                            <Dropdown.Item as={'div'}>Quản lý sản phẩm</Dropdown.Item>
                        </Link>
                        <Link className={cx('text-link')} to='/order'>
                            <Dropdown.Item as={'div'}>Quản lý đơn hàng</Dropdown.Item>
                        </Link>
                        <Link className={cx('text-link')} to='/warehouse'>
                            <Dropdown.Item as={'div'}>Quản lý kho hàng</Dropdown.Item>
                        </Link>
                        <Link className={cx('text-link')} to='/user'>
                            <Dropdown.Item as={'div'}>Quản lý người dùng</Dropdown.Item>
                        </Link>
                        <Link className={cx('text-link')} to='/sales'>
                            <Dropdown.Item as={'div'}>Thống kê doanh thu</Dropdown.Item>
                        </Link>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col className='text-end' xs={5} lg={2}>
                <Button className={cx('logout-btn')} onClick={logout}><GiExitDoor /> Đăng xuất</Button>
            </Col>
        </Row>
    )
}

export default NavBar