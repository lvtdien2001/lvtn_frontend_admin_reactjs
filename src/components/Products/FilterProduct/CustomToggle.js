import { Button } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
        <Button
            type='button'
            variant='outline-secondary'
            onClick={decoratedOnClick}
            className='mb-1'
        >
            {children}
        </Button>
    );
}

export default CustomToggle
