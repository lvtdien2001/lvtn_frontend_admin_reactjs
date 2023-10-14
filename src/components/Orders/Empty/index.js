import classNames from 'classnames/bind';
import styles from './Empty.module.scss';
import orderImg from '../../../assets/images/order.jpg';

const cx = classNames.bind(styles);

const Empty = () => {
    return (
        <div className={`${cx('wrapper')}`}>
            <div className='text-center'>
                <img alt='' src={orderImg} width='70px' height='70px' />
                <p className='text-secondary fs-5'>Chưa có đơn hàng</p>
            </div>
        </div>
    )
}

export default Empty
