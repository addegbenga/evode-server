import React from "react";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";

export default function Adminboard() {
  return (
    <div className="flex ">
      <LeftPane />
      <RightPane/>
    </div>
  );
}
