import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import styles from './Message.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AlertDismissibleExample({ message, type, setMessage }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
            setMessage('');
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

export default AlertDismissibleExample;