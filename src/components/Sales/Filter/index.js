import { Dropdown, ButtonGroup, Button } from "react-bootstrap"

const Filter = ({ setFilter, filter }) => {
    const date = new Date();
    const currentYear = Number(date.getFullYear());
    const years = new Array(16).fill('');
    const months = new Array(12).fill('');

    let body = (
        <>
            Bộ lọc:
            <Dropdown className="ms-3 me-3" as={ButtonGroup}>
                <Button size='sm' variant="secondary">Năm:</Button>
                <Dropdown.Toggle size="sm" split variant="secondary">{filter.year} </Dropdown.Toggle>

                <Dropdown.Menu as='div' align='end' className="super-colors">
                    {years.map((e, i) => {
                        return (
                            <Dropdown.Item
                                className="text-center"
                                key={i}
                                onClick={() => setFilter(prev => {
                                    return { ...prev, year: (currentYear - 10 + i) }
                                })}
                            >
                                {currentYear - 10 + i}
                            </Dropdown.Item>
                        )
                    })}
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={ButtonGroup}>
                <Button size='sm' variant="secondary">Tháng:</Button>
                <Dropdown.Toggle size="sm" split variant="secondary">{filter.month || 'Cả năm'} </Dropdown.Toggle>

                <Dropdown.Menu as='div' align='end' className="super-colors">
                    <Dropdown.Item
                        className="text-center"
                        onClick={() => setFilter(prev => {
                            return { ...prev, month: '' }
                        })}
                        active={filter.month === ''}
                    >
                        Cả năm
                    </Dropdown.Item>
                    {months.map((e, i) => {
                        return (
                            <Dropdown.Item
                                className="text-center"
                                key={i}
                                onClick={() => setFilter(prev => {
                                    return { ...prev, month: (i + 1) }
                                })}
                                active={Number(filter.month) === (i + 1)}
                            >
                                {i + 1}
                            </Dropdown.Item>
                        )
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )

    return (
        <div>
            {body}
        </div>
    )
}

export default Filter
