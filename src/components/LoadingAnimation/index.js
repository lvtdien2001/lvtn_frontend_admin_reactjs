import { Spinner } from 'react-bootstrap';

const LoadingAnimation = () => {
    return (
        <div className="text-center">
            <Spinner animation="border" variant="success" />
        </div>
    )
}

export default LoadingAnimation
