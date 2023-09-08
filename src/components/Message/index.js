import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import styles from './Message.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Message({ message, type, setMessage }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
            setMessage({ content: '', type: '' });
        }, 5000)
    }, [])

    return (
        <div className={cx('position')}>
            <Alert variant={type} hidden={!show} onClose={() => setShow(false)} dismissible>
                <p>
                    {message}
                </p>
            </Alert>
        </div>
    );
}

export default Message;