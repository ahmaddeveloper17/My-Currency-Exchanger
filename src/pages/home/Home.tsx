import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/background.jpg";
import MainCard from "../../components/mainCard/MainCard";
export default function Home() {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const navigate = useNavigate();
  const handleDropDown = () => {
    if (!selectedCurrency) {
      alert("Please select a currency");
    } else {
      navigate(`/convert?currency=${selectedCurrency}`);
    }
  };
  return (
    <div className="  overflow-x: hidden;    ">
      <div className="bg-blue-50 h-[470px] mt-20 ">
        <h1 className="text-center font-roboto text-gray-900 text-6xl font-bold leading-100 pt-[42px] ">
          Currency Converter
        </h1>
        <p className="text-center mt-[25px] font-roboto text-base input:mx-[10px] font-normal leading-7 text-gray-700">
          Need to make an international business payment? Take a look at our
          live foreign exchange rates.
        </p>
        <div className="relative mt-[69.12px] sm:w-[550px] md:w-[700px] input:w-[350px] lg:w-[900px] mx-[auto] ">
          <MainCard />
        </div>
      </div>
      <div className="sm:my-48 sm:ml-[80px] md:ml-[100px] lg:ml-[280px] md:text-left input:text-center input:mx-[20px] lg:mt-[335px] md:mt-[325px] input:mb-[50px] input:mt-[625px] sm:mt-[355px] xl:mt-[345px] 2xl:mt-[355px] 3xl:mt-[365px]  4xl:mt-[375px] ">
        <h1 className="text-gray-900  font-roboto text-4xl font-bold leading-10">
          Let’s save you some time
        </h1>
        <p className="mt-6">
          If you’ve got a target exchange rate in mind but haven’t got time to
          keep tabs <br /> on market movement, then a firm order could be
          perfect for you. When your <br /> chosen rate is reached, we’ll act
          immediately, leaving you free to concentrate <br /> on your business.
        </p>
        <button className=" border-2 rounded border-[#E5133A] hover:bg-white hover:text-[#E5133A] mt-4 bg-[#E5133A] h-14 text-white p-4">
          Find out more
        </button>
      </div>
      <div
        className=" w-[2000  px] h-[260px]   "
        style={{ background: `url(${background})` }}
      >
        <div className="bg-blue-100 bg-blue-300/20 h-[260px]">
          <h1 className="text-center text-gray-900 pt-[20px] font-roboto text-4xl font-bold leading-10">
            Popular currencies
          </h1>
          <div className="flex flex-col sm:flex-row pt-[20px] justify-center items-center   mt-16">
            <select
              className="sm:w-[440px] input:w-[350px] h-[44px]  mt-3 p-1 rounded-lg border-2 text-gray-400 focus:outline-none"
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              <option value=""> Select Currency </option>
              <option value="USD  " className=" font-bold">
                {" "}
                USD ( United States Dollar )
              </option>
              <option value="EUR  " className=" font-bold">
                {" "}
                EUR ( Euro )
              </option>
              <option value="JPY  " className=" font-bold">
                {" "}
                JPY ( Japanese Yen )
              </option>
              <option value="NZD  " className=" font-bold">
                {" "}
                NZD ( New Zealand Dollar )
              </option>
              <option value="PKR  " className=" font-bold">
                {" "}
                PKR ( Pakistan Rupees )
              </option>
              <option value="CAD  " className=" font-bold">
                {" "}
                CAD ( Canadian Dollar )
              </option>
            </select>
            <button
              onClick={handleDropDown}
              className="border-4 mt-3 rounded border-[#E5133A] mx-4 px-8 ph-1 bg-[#E5133A] text-white font-bold hover:bg-white hover:text-[#E5133A]"
            >
              <div className="sm:px-[74px] rounded pt-[7px] pb-[7px] input:px-[74px] xl:px-[74px]">
                Go
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
