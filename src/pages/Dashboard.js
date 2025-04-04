import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../AuthContext";
import StocksChart from "../components/Charts/StocksChart";
import TopSellingChart from "../components/Charts/TopSellingChart";
import MonthlySales from "../components/Charts/MonthlySales";
import ProductExpiryChart from "../components/Charts/ProductExpiryChart";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaBoxesPacking } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";

function Dashboard() {
  const [saleAmount, setSaleAmount] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProduct] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [salesByMonth, setSalesByMonth] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    setTotalProduct(products.length);
  }, [products]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchTotalSaleAmount();
    fetchTotalPurchaseAmount();
    fetchProductsData();
    fetchMonthlySalesData();
    fetchTopProductsData();
    fetchSuppliersData();
  }, []);

  const fetchSuppliersData = () => {
    fetch(`http://localhost:3000/api/v1/suppliers`)
      .then((response) => response.json())
      .then((data) => {
        setSuppliers(data.data);
      })
      .catch((er) => console.log(er));
  };

  // Fetching total sales amount
  const fetchTotalSaleAmount = () => {
    fetch(`http://localhost:3000/api/v1/kpis/total-selling`)
      .then((response) => response.json())
      .then((data) => setSaleAmount(data.totalSelling));
  };

  // Fetching total purchase amount
  const fetchTotalPurchaseAmount = () => {
    fetch(`http://localhost:3000/api/v1/kpis/total-purchase`)
      .then((response) => response.json())
      .then((data) => setPurchaseAmount(data.totalPurchase));
  };

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:3000/api/v1/products`, {
      headers: {
        Authorization: `Bearer ${authContext.user}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((er) => console.log(er));
  };

  // Fetching Monthly Sales
  const fetchMonthlySalesData = () => {
    fetch(`http://localhost:3000/api/v1/kpis/monthly-sales`)
      .then((response) => response.json())
      .then((data) => setSalesByMonth(data))
      .catch((err) => console.log(err));
  };

  const fetchTopProductsData = () => {
    fetch(`http://localhost:3000/api/v1/kpis/top-selling-products`)
      .then((response) => response.json())
      .then((data) => setTopProducts(data.topSellingProducts))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4  p-4 ">
        <article className="flex flex-col gap-4 rounded-lg border  border-gray-100 bg-white p-6  ">
          <FaArrowTrendUp className="text-2xl text-green-600" />
          <strong className="block text-sm font-medium text-gray-500">
            Revenue
          </strong>
          <p>
            <span className="text-2xl font-medium text-gray-900">
              ${saleAmount}
            </span>
          </p>
        </article>
        <article className="flex flex-col  gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
          <FaArrowTrendDown className="text-2xl text-red-600" />
          <strong className="block text-sm font-medium text-gray-500">
            Spending
          </strong>
          <p>
            <span className="text-2xl font-medium text-gray-900">
              ${purchaseAmount}
            </span>
            {/*<span className="text-xs text-gray-500"> from $404.32 </span>*/}
          </p>
        </article>
        <article className="flex flex-col   gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
          <FaBoxesPacking className="text-2xl text-custom-blue" />
          <strong className="block text-sm font-medium text-gray-500">
            No. of Suppliers
          </strong>
          <p>
            <span className="text-2xl font-medium text-gray-900">
              {suppliers.length}
            </span>
            {/* <span className="text-xs text-gray-500"> from 0 </span> */}
          </p>
        </article>
        <article className="flex flex-col   gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
          <AiFillProduct className="text-2xl text-custom-orange" />
          <strong className="block text-sm font-medium text-gray-500">
            No. of Products
          </strong>
          <p>
            <span className="text-2xl font-medium text-gray-900">
              {totalProducts}
            </span>
          </p>
        </article>
        <div className="flex flex-wrap gap-y-[1rem] gap-x-[1rem] justify-around rounded-lg col-span-full justify-center">
          <div className="bg-white py-8 px-8  col rounded-lg">
            <div className="text-2xl font-semibold px-4 mb-[1rem]">
              Monthly Sales
            </div>
            <div style={{ width: "1000px", height: "400px" }}>
              <MonthlySales salesData={salesByMonth} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-y-[1rem] gap-x-[1rem] justify-around bg-white rounded-lg py-8 col-span-full justify-center">
          <div className="flex flex-col justify-between">
            <div>
              <div className="text-2xl font-semibold px-4 mb-[1rem]">
                Products Stock
              </div>
              <StocksChart products={products} />
            </div>
            <div>
              <div className="text-2xl font-semibold px-4 mb-[1rem]">
                Products Expiry
              </div>
              <ProductExpiryChart />
            </div>
          </div>
          <div>
            <div className="text-2xl font-semibold px-4 mb-[1rem]">
              Top Selling Products
            </div>
            <TopSellingChart topProducts={topProducts} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
