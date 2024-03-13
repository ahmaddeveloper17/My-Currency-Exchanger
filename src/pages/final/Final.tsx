import React from "react";
import { useLocation } from "react-router-dom";
import LastCard from "../../components/lastCard/lastCard";
export default function Final() {
  const location = useLocation();
  const CUR1 = new URLSearchParams(location.search).get("CUR1");
  const toCUR2 = new URLSearchParams(location.search).get("toCUR2");
  return (
    <div className="mt-20 max-w-screen ">
      <div className="bg-blue-50 h-[300px]">
        <h1 className="text-center text-[60px] font-roboto text-gray-900 text-6xl font-bold pt-10 sm:pt-[42px]">
          Convert {CUR1} to {toCUR2}
        </h1>
      </div>
      <div className="mt-[-104px] relative sm:w-[550px] md:w-[700px] input:w-[350px] lg:w-[900px] mx-[auto] overflow-x-hidden pb-[108px]">
        <LastCard />
      </div>
    </div>
  );
}
