import Link from "next/link";
import React from "react";
import "./availab.css";
const Availab = (props) => {
  return (
    <div className="availab-container">
      <p className="pb-4 pt-8">{props.name} will be available soon.</p>
      <button className="bg-red-800 text-white p-2 rounded-xl">
        <Link href="/">Turn back Home.</Link>
      </button>
    </div>
  );
};

export default Availab;
