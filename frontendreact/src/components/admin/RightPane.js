import React, { useState } from "react";
import notification from "../../img/Vector.png";
import { datass, options } from "../mockdata";
import LineGraph from "../charts/LineGraph";

export default function RightPane() {
  // eslint-disable-next-line
  const [data, setData] = useState([
    {
      title: "Customer orders",
      price: 200,
      img: notification,
    },
    {
      title: "Products",
      price: 200,
      img: notification,
    },
    {
      title: "Total Refunds",
      price: 200,
      img: notification,
    },
    {
      title: "Revenue",
      price: 200,
      img: notification,
    },
  ]);

  // eslint-disable-next-line
  const [datas, setDatas] = useState({
    response: datass,
    labels: options,
  });
  const { labels, response } = datas;
  return (
    <section
    style={{ overflowY: "scroll", height:"100vh" }}
      className="p-5 bg-lenx-bg w-screen "
    >
      <div className="flex justify-between items-center py-3">
        <h1 className="text-2xl font-bold ">Dashboard</h1>
        <span className="p-2 bg-white rounded-full">
          <img className="w-4 h-4" src={notification} alt="notification"></img>
        </span>
      </div>
      <div className="flex flex-wrap pt-5">
        {data.map((item) => (
          <div
            key={Math.random()}
            className="flex flex-1 p-6  bg-white mr-1 my-1 items-center rounded-lg shadow-lg  "
          >
            <span className="bg-lenx-primary w-10 flex mr-3 flex items-center justify-center rounded-md h-12">
              <img className="w-4" src={item.img} alt="lock"></img>
            </span>
            <div>
              <p className="text-lenx-text-primary text-sm">{item.title}</p>
              <span className="text-lenx-gray-100">{item.price}</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        {/* <h1>React chart component</h1> */}
        <LineGraph data={response} options={labels} />
      </div>
      <div>
        <h1>Top selling products</h1>
        <div>
          <div>product one</div>
          <div>product two</div>
          <div>product three</div>
        </div>
      </div>
      <div>
        <h1>Order component</h1>
      </div>
    </section>
  );
}
