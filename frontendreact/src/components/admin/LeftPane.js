import React, { useState } from "react";
import notification from "../../img/Vector.png";
import logo from "../../img/logo.svg";

export default function LeftPane() {
  // eslint-disable-next-line
  const [data, setData] = useState([
    {
      title: "Dashboard",
      img: notification,
      link: "/dashboard",
    },
    {
      title: "Products",
      link: "/products",
      img: notification,
    },
    {
      title: "Tickets",
      link: "/tickets",
      img: notification,
    },
    {
      title: "Orders",
      link: "/order",
      img: notification,
    },
    {
      title: "Revenue",
      link: "/revenue",
      img: notification,
    },
    {
      title: "Chat",
      link: "/chat",
      img: notification,
    },
    {
      title: "Settings",
      link: "/setting",
      img: notification,
    },
  ]);
  return (
    <div
      style={{ overflowY: "scroll", height: "100vh" }}
      className="bg-lenx-bg-secondary p-8 hidden md:block"
    >
      <div>
        <img className="w-28 m-auto" src={logo} alt="logo"></img>
        {/* <div className="flex flex-wrap pt-6" style={{width:"200px"}}> */}
        <div className="grid pt-6 md:grid-cols-2 sm:grid-cols-1 items-center gap-2">
          {data.map((item) => (
            <div className="bg-white p-8 flex flex-col items-center rounded-md">
              <img src={item.img} alt="none"></img>
              <p className="text-sm">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
