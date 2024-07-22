import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import TableOne from '../../components/Tables/TableOne';
import axios from 'axios'; 
import OrderService from '../../database/OrderService'

const PAYMENT_CASH = "CASH";
const PAYMENT_UPI = "UPI";
const ECommerce: React.FC = () => {
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalCashPayment, setTotalCashPayment] = useState<number>(0);
  const [totalUPIPayment, setTotalUPIPayment] = useState<number>(0);
  const [todaySales, setTodaySales] = useState<number>(0);
  const [todayOrder, setTodayOrder] = useState<number>(0);

  const [chartData, setChartData] = useState<any>();
  const [cardData, setCardData] = useState({
    totalViews: {
        data: "0",
        profit: true,
        margin: 0
    },
    totalProfit: {
        data: "0",
        profit: true,
        margin: 0
    },
    totalProduct: {
        data: "0",
        profit: true,
        margin: 0
    },
    totalUser: {
        data: "0",
        profit: true,
        margin: 0
    }
  });

  useEffect(() => {
    const unsubscribe = OrderService.getAllOrders().then((orders: any) => {
      const data = orders.docs.map((row: any) => {
        const order = row.data();
        return {
          orderDate: order.createdAt.toDate().toLocaleDateString("en-US"),
          totalQty: order.cart.length,
          totalAmount: order.cartTotal,
          totalSales: Number.parseFloat(order.cartTotal),
          cash: order.paymentMode === PAYMENT_CASH ? 1 : 0,
          upi: order.paymentMode === PAYMENT_UPI ? 1 : 0,
        };
      });

      setTotalOrders(orders.docs.length);
      setTotalAmount(
        data.map((item: any) => item.totalSales).reduce((prev: any, next: any) => prev + next)
      );
      setTotalCashPayment(
        data.map((item: any) => item.cash).reduce((prev: any, next: any) => prev + next)
      );
      setTotalUPIPayment(
        data.map((item: any) => item.upi).reduce((prev: any, next: any) => prev + next)
      );
      setChartData(data);

      let tdyData = data || [];
      tdyData = data.filter(
        (item: any) => new Date(item.orderDate).getDate() === new Date().getDate()
      );
      tdyData = tdyData.reduce((a: any, b: any) => a + Number(b.totalAmount), 0);
      setTodayOrder(
        data.filter(
          (item: any) => new Date(item.orderDate).getDate() === new Date().getDate()
        ).length
      );

      setTodaySales(tdyData);
      setChartData(data);
      const result = [];

    let chartResult= data.reduce(function (res: any, value: any) {
      if (!res[value.orderDate]) {
        res[value.orderDate] = {
          orderDate: value.orderDate,
          sales: 0,
          items: 0,
        };
        result.push(res[value.orderDate]);
      }
      res[value.orderDate].sales += value.totalSales;
      res[value.orderDate].items += value.totalQty;
      return res;
    }, {});
    let tempCatagory = [];
    let tempSales = [];
    let tempItems = [];
    for (let item in chartResult) {
      tempCatagory.push(chartResult[item].orderDate);
      tempSales.push(chartResult[item].sales);
      tempItems.push(chartResult[item].items);
    }
    let totalDatas = {
      catagory: tempCatagory,
      sales: tempSales,
      items: tempItems,
    };
    console.log(totalDatas,"totalDatas")
    setChartData(totalDatas);
    });

    //return unsubscribe;
  }, []);
  const fetchBrandData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/dashboard/cardData`); 
      setCardData(response.data);
    } catch (error) {
      console.error('Error fetching brand data:', error);
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Orders" total={`${totalOrders}`} rate={`${Math.round((todayOrder / totalOrders) * 100) ? Math.round((todayOrder / totalOrders) * 100) : 0}%`} levelUp={true}>
        <svg
            className="fill-primary dark:fill-white"
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z"
              fill=""
            />
            <path
              d="M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z"
              fill=""
            />
            <path
              d="M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Sales" total={`₹${totalAmount}`} rate={`${Math.round((todaySales / totalAmount) * 100) ? Math.round((todaySales / totalAmount) * 100) : 0}%`} levelUp={true}>
          <svg
            className="fill-primary dark:fill-white"
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4"></path>
          </svg>
        </CardDataStats>
        <CardDataStats title="PAYMENT - CASH" total={`${totalCashPayment}`} rate={`${Math.round((totalCashPayment / totalOrders) * 100) ? Math.round((totalCashPayment / totalOrders) * 100) : 0}%`} levelUp={true}>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 8h2v8H5zm7 0H9c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1m-1 6h-1v-4h1zm7-6h-3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1m-1 6h-1v-4h1z"></path>
          </svg>
        </CardDataStats>
        <CardDataStats title="PAYMENT - UPI" total={`${totalUPIPayment}`} rate={`${Math.round((totalUPIPayment / totalOrders) * 100) ? Math.round((totalUPIPayment / totalOrders) * 100) : 0}%`} levelUp={true}>
          <svg
            className="fill-primary dark:fill-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 1H9c-1.1 0-2 .9-2 2v3h2V4h10v16H9v-2H7v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2M7.01 13.47l-2.55-2.55-1.27 1.27L7 16l7.19-7.19-1.27-1.27z"></path>
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-4 mb-4 grid">
        {chartData && <ChartOne chartData={chartData}/>}
      </div>
      <div className="mt-4 mb-4 grid overflow-auto">
        <TableOne />
      </div>
    </>
  );
};

export default ECommerce;
