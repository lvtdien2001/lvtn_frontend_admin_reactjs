import { Button, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './FilterOrders.module.scss';

const cx = classNames.bind(styles);

const FilterOrders = ({ filter, setFilter }) => {
    let body = (
        <>
            <Col>
                <Button
                    className={cx('btn')}
                    variant='outline-success'
                    active={filter === ''}
                    onClick={() => setFilter('')}
                >
                    Tất cả
                </Button>
            </Col>
            <Col>
                <Button
                    className={cx('btn')}
                    variant='outline-success'
                    active={filter === '01'}
                    onClick={() => setFilter('01')}
                >
                    Chờ xác nhận
                </Button>
            </Col>
            <Col>
                <Button
                    className={cx('btn')}
                    variant='outline-success'
                    active={filter === '02'}
                    onClick={() => setFilter('02')}
                >
                    Chờ lấy hàng
                </Button>
            </Col>
            <Col>
                <Button
                    className={cx('btn')}
                    variant='outline-success'
                    active={filter === '03'}
                    onClick={() => setFilter('03')}
                >
                    Đang vận chuyển
                </Button>
            </Col>
            <Col>
                <Button
                    className={cx('btn')}
                    variant='outline-success'
                    active={filter === '04'}
                    onClick={() => setFilter('04')}
                >
                    Đã nhận
                </Button>
            </Col>
            <Col>
                <Button
                    className={cx('btn')}
                    variant='outline-success'
                    active={filter === '07'}
                    onClick={() => setFilter('07')}
                >
                    Đã hủy
                </Button>
            </Col>
        </>
    )

    return (
        <div className={`text-center mb-3 ${cx('wrapper')}`}>
            <Row>{body}</Row>
        </div>
    )
}

export default FilterOrders
