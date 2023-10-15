import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import moment from 'moment';

const Chart = ({ orders, filter, formatPrice }) => {
    // month has 28-30-31 days
    const month30 = filter.month === '04' || filter.month === '06' || filter.month === '09' || filter.month === '11';
    const month28 = filter.month === '02';
    const month31 = !month28 && !month30;

    // const labelsOfYear = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

    const labelsOfYear = [];
    for (let i = 1; i <= 12; i++) {
        labelsOfYear.push(`Tháng ${i}`);
    }

    const labelsOfMonth = [];
    for (let i = 1; i <= (month31 ? 31 : (month28 ? 28 : 30)); i++) {
        labelsOfMonth.push(`Ngày ${i}`);
    }

    const totalSales = orders.reduce((prev, order) => {
        return prev + order.totalAmount;
    }, 0);

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Biểu đồ thống kê doanh thu${filter.month && ' tháng ' + filter.month} năm ${filter.year} - Tổng doanh thu ${formatPrice(totalSales)}`,
            },
        },
    };

    let dataOfChart = new Array(!(filter.month) ? 12 : (month28 ? 28 : (month30 ? 30 : 31))).fill(0);
    orders?.forEach(order => {
        !(filter.month) ?
            (dataOfChart[moment(order.createdAt).month()] += order.totalAmount) :
            (dataOfChart[moment(order.createdAt).date()] += order.totalAmount)
    })

    const data = {
        labels: filter.month ? labelsOfMonth : labelsOfYear,
        datasets: [
            {
                label: 'Doanh thu',
                data: dataOfChart,
                backgroundColor: '#82afdb',
                // backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    };

    return (
        <>
            <Bar data={data} options={options} />
        </>
    )
}

export default Chart
