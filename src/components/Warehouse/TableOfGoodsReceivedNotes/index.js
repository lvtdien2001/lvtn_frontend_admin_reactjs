import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/vi';
import { AddGoodsReceivedNoteModal } from '..';

const TableOfGoodsReceivedNote = ({ setMessage, formatPrice }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/goods-received-note`);
                if (rsp.data.success) {
                    setNotes(rsp.data.goodsReceivedNotes);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error.response?.message);
            }
        }
        fetchApi();
    }, [])

    let body = (
        !loading && notes.map((note, index) => {
            return (
                <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className='text-center'>{moment(note.createdAt).format('llll')}</td>
                    <td className='text-center'><b className='text-danger'>{formatPrice(note.totalAmount)}</b></td>
                    <td className='text-center'>
                        {note.products?.length}
                    </td>
                    <td style={{ minWidth: '100px' }} className="text-center">
                        Xem chi tiết
                    </td>
                </tr>
            )
        })
    )

    return (
        <>
            <AddGoodsReceivedNoteModal setMessage={setMessage} formatPrice={formatPrice} setNotes={setNotes} />
            {!loading && <>
                <Table size="sm" responsive bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>STT</th>
                            <th>Ngày lập phiếu</th>
                            <th>Tổng giá trị</th>
                            <th>Phân loại sản phẩm</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </Table>
            </>}
        </>
    );
}

export default TableOfGoodsReceivedNote
