import React, { useState } from "react";
import notification from "../../img/Vector.png";
import logo from "../../img/logo.svg";

export default function LeftPane() {
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
    <div className=" bg-lenx-bg-secondary p-8">
      <div>
        <img className="w-28 m-auto" src={logo} alt="logo"></img>
        <div className="grid pt-6 grid-cols-2 items-center gap-4">
          {data.map((item) => (
            <div className="bg-white p-8 flex flex-col items-center rounded-md ">
              <img src={item.img} alt="none"></img>
              <p className="text-sm">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
