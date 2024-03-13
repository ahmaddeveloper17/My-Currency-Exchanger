import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSymbols } from "../../store/features/currencySlice";

import {
  selectCurrency,
  fetchData,
  setBaseCurrency,
  setTargetCurrency,
} from "../../store/features/currencySlice";
import { Cross } from "../../assets/SVGs/Icons";
import { CurrencyOption } from "../../types/types";

function calculateConvertedAmount(
  amount: number,
  sourceCurrency: string,
  targetCurrency: string,
  exchangeRates: Record<string, number>
): number {
  const sourceToEurRate = exchangeRates[sourceCurrency] || 1;
  const targetToEurRate = exchangeRates[targetCurrency] || 1;

  const eurAmount = amount / sourceToEurRate;
  const targetAmount = eurAmount * targetToEurRate;
  return targetAmount;
}

const LastCard = () => {
  const symbols = useSelector(selectSymbols);
  const location = useLocation();

  const CUR1 = new URLSearchParams(location.search).get("CUR1");
  const toCUR2 = new URLSearchParams(location.search).get("toCUR2");
  const dispatch = useDispatch();

  const { rates, loading, error, baseCurrency, targetCurrency } =
    useSelector(selectCurrency);
  const [amount, setAmount] = useState<number | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    dispatch<any>(fetchData());
    if (CUR1) {
      dispatch(setBaseCurrency(CUR1));
    }
    if (toCUR2) {
      dispatch(setTargetCurrency(toCUR2));
    }
  }, [dispatch, CUR1, toCUR2]);

  const handleBaseCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setBaseCurrency(event.target.value));
  };

  const handleTargetCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setTargetCurrency(event.target.value));
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleConversion = () => {
    if (rates && targetCurrency && baseCurrency !== null && amount !== null) {
      const baseRate = rates[baseCurrency];
      const targetRate = rates[targetCurrency];
      if (baseRate !== undefined && targetRate !== undefined) {
        const sourceRate = parseFloat(String(baseRate));
        const targetRateValue = parseFloat(String(targetRate));
        if (!isNaN(sourceRate) && !isNaN(targetRateValue)) {
          const exchangeRateAmount = amount / sourceRate;
          const converted = exchangeRateAmount * targetRateValue;
          setConvertedAmount(converted);
        }
      }
    }
  };
  const convertCurrency = () => {
    if (!amount || !rates || !targetCurrency) {
      return;
    }

    calculateConvertedAmount(amount, baseCurrency || "", targetCurrency, rates);
    handleConversion();
    setPopupVisible(false);
  };

  const swapCurrencies = () => {
    if (baseCurrency && targetCurrency) {
      dispatch(setBaseCurrency(targetCurrency));
      dispatch(setTargetCurrency(baseCurrency));
    }
  };

  const mapRatesToOptions = (): CurrencyOption[] => {
    if (!rates || !symbols) return [];

    return Object.keys(rates).map((currency) => ({
      value: currency,
      label: ` ${symbols[currency]} `,
    }));
  };

  return (
    <div className="rounded-md relative bg-white md:w-[700px]  lg:w-[900px] shadow-2xl ">
      <h1 className=" text-white mb-[-15px]"> g</h1>
      <h1 className="text-center text-[20px] sm:text-[32px] font-roboto text-3xl font-bold leading-7 text-gray-800 mt-6 mb-[30px]">
        Make fast and affordable <br /> international business payments
      </h1>
      <p className="text-gray-800 font-roboto text-base text-center leading-6">
        Send secure international business payments in <b>XX</b> currencies, all
        at competitive rates with no hidden fees.
      </p>
      <div className="flex flex-col sm:flex-row lg:ml-[40px] input:ml-[-1px] mt-14">
        <div className="rounded-sm border-2 border-t-[-18px] input:w-[320px] input:mx-auto w-full sm:w-2/3 border-[#C6C6C6] h-[64px] bg-white sm:ml-[40px] md:ml-[40px] lg:ml-[0px] p-4 mb-4 sm:mb-0">
          <div className="flex">
            <div className="w-3/4 pr-2 mt-[-10px]">
              <p>Amount</p>
              <input
                type="number"
                placeholder="0"
                value={amount || ""}
                onChange={handleAmountChange}
                className="ring-0 focus:outline-none w-full font-bold  placeholder:text-[#1A1A1A] font-roboto text-[20px] text-[black]"
              />
            </div>
            {loading === "succeeded" && (
              <div className="w-1/4 relative">
                <select
                  id="baseCurrency"
                  name="baseCurrency"
                  value={CUR1 || ""}
                  className="currency-select border-r-white font-bold text-[20px] text-[black] border-b-2 mt-[-16px] border-l-2 h-[62px] border-[#C6C6C6] h-17 input:w-[70px] sm:w-[60px] md:w-[70px] xl:w-[102px]"
                  onChange={handleBaseCurrencyChange}
                  style={{ fontFamily: "YourChosenFont, sans-serif" }}
                >
                  {mapRatesToOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      <table>
                        <tr>
                          <td style={{ fontFamily: "Helvetica" }}>
                            {option.value}
                          </td>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <td style={{ fontFamily: "Helvetica" }}>
                            {option.label}
                          </td>
                        </tr>
                      </table>
                    </option>
                  ))}
                </select>
              </div>
            )}
            {loading === "pending" && <p>Loading...</p>}
          </div>
          {loading === "failed" && <p>Error: {error}</p>}
        </div>
        <button
          className="sm:ml-4 sm:mr-4 sm:mb-4 sm:w-6 mx-auto my-[5px]"
          onClick={swapCurrencies}
        >
          <Cross />
        </button>
        <div className="rounded-sm border-2 h-[64px] w-full mr-[40px] input:w-[320px] input:mx-auto sm:w-2/3 sm:mr-[40px] border-[#C6C6C6] bg-white p-4">
          <div className="flex">
            <div className="w-3/4 pr-2 mt-[-10px]">
              <p>Converted to</p>
              <input
                type="number"
                placeholder="0"
                value={
                  convertedAmount !== null ? convertedAmount.toFixed(2) : ""
                }
                readOnly
                className="ring-0 focus:outline-none h-[24px] w-full font-bold  placeholder:text-[#1A1A1A] font-roboto text-[20px] text-[black]"
              />
            </div>
            {loading === "succeeded" && (
              <div className="w-1/4 ">
                <select
                  id="targetCurrency"
                  name="targetCurrency"
                  value={targetCurrency || ""}
                  className="currency-select border-r-white font-bold text-[20px] text-[black] border-b-2 mt-[-16px] border-l-2 h-[62px] border-[#C6C6C6] h-17 input:w-[70px] sm:w-[60px] md:w-[70px] xl:w-[102px]"
                  onChange={handleTargetCurrencyChange}
                  style={{ fontFamily: "YourChosenFont, sans-serif" }}
                >
                  {mapRatesToOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      <table>
                        <tr>
                          <td style={{ fontFamily: "sans-serif" }}>
                            {option.value}
                          </td>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <td style={{ fontFamily: "sans-serif" }}>
                            {option.label}
                          </td>
                        </tr>
                      </table>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {loading === "pending" && <p>Loading...</p>}
          </div>
          {loading === "failed" && <p>Error: {error}</p>}
        </div>
      </div>
      <div className="flex flex-col ml-[40px] sm:flex-row mt-14 mr-[3px]] justify-between">
        <p className="w-[600px] h-8 mt-2 rounded-full   font-roboto text-base font-bold leading-10 cursor-pointer flex ">
          {`1.00 ${baseCurrency} =
          ${
            rates?.[baseCurrency]
              ? (rates[targetCurrency] / rates[baseCurrency]).toFixed(4)
              : { baseCurrency }
          }
           ${targetCurrency}`}
          <div
            onMouseOut={() => setPopupVisible(false)}
            onClickCapture={() => setPopupVisible(false)}
            onClick={() => setPopupVisible(true)}
            onMouseOver={() => setPopupVisible(true)}
            className="bg-blue-500 text-white ml-[15px] mt-[10px] w-[22px] h-[22px] rounded-full flex items-center justify-center"
          >
            i
          </div>
        </p>

        {popupVisible && (
          <div className="fixed inset-0 bg-opacity-75 z-10 flex items-center justify-center">
            <div className="bg-[#F0F5FF] text-[#3D55DD] p-[20px] rounded-md shadow-lg">
              <p className="text-xl font-bold text-[#3D55DD]">
                Exchange rate at 14:00 GMT.
              </p>
              <p className="mt-[25px]">
                Live rates vary minute to minute. The <br /> quotes you receive
                here will differ to <br /> your final trade amount.
                <br />
                <p className="mt-[20px]">
                  Lorem ipsum dolor sit amet <br /> consectetur adipiscing elit
                  mod duo sed <br /> eiusmod lorem ipsum dolor sit amet
                  <br /> consectetur adipiscing elit mod duo.
                </p>
              </p>
            </div>
          </div>
        )}
        <button
          onClick={convertCurrency}
          className=" md:px-[100px] sm:px-[60px] lg:px-[150px] 2xl:px-[150px] 3xl:px-[150px] 4xl:ml-[100px] 4xl:px-[150px] mb-[40px] mr-[40px] h-10 mt-3 border-2 border-[#E5133A] hover:bg-white hover:text-red-500 flex-shrink-0 rounded bg-[#E5133A] text-white font-roboto text-base leading-46 cursor-pointer"
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default LastCard;
