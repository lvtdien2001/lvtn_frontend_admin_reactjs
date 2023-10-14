import { Pagination } from 'react-bootstrap';

function PaginationApp({ page, lastPage, setPage, align }) {
    let body = [];
    for (let i = 1; i <= lastPage; i++) {
        body.push(
            <Pagination.Item
                onClick={() => setPage(i)}
                key={i}
                active={Number(page) === i}
            >
                {i}
            </Pagination.Item>
        );
    }

    return (
        <Pagination className={align}>
            <Pagination.Item
                disabled={Number(page) === 1}
                onClick={() => setPage(1)}
            >
                Trang đầu
            </Pagination.Item>
            <Pagination.Prev
                onClick={() => setPage(prev => prev - 1)}
                disabled={Number(page) === 1}
            />

            {/* {body.map(e => e)} */}
            {page > 2 && <Pagination.Ellipsis />}
            {page > 1 && <Pagination.Item onClick={() => setPage(Number(page) - 1)} >{page - 1}</Pagination.Item>}
            <Pagination.Item active>{page}</Pagination.Item>
            {page < lastPage && <Pagination.Item onClick={() => setPage(Number(page) + 1)} >{page + 1}</Pagination.Item>}
            {page < lastPage - 1 && <Pagination.Ellipsis />}

            <Pagination.Next
                onClick={() => setPage(prev => Number(prev) + 1)}
                disabled={Number(page) === Number(lastPage)}
            />
            <Pagination.Item
                disabled={Number(page) === Number(lastPage)}
                onClick={() => setPage(lastPage)}
            >
                Trang cuối
            </Pagination.Item>
        </Pagination>
    );
}

export default PaginationApp;