import React from "react";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"
import {Doughnut} from "react-chartjs-2"
import { listTransactionAPI } from "../../services/transactions/tranasctionServices";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(ArcElement, Tooltip, Legend)

const TransactionChart = () => {
  //! fetching transactions
  let {data, isError, isFetched, isLoading, error, refetch} = useQuery({
    queryFn:listTransactionAPI,
    queryKey:['list-transaction']
  })
  // console.log(data);
  //! calculating total income and expense
  let income = 0
  let expense = 0
  const total = data?.reduce(
    (acc, transaction) => {
      if (transaction?.type === "income") {
        income += transaction?.amount;
      } else {
        expense += transaction?.amount;
      }
      return acc;
    }
  );
//  console.log(income, expense)
  //! data structure for chart
  const datasets = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [income, expense],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#36A2EB", "#FF6384"],
        borderWith: 1,
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 25,
          boxWidth: 12,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Income vs Expense",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    cutout: "70%",
  };
  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">
        Transaction Overview
      </h1>
      <div style={{ height: "350px" }}>
        <Doughnut data={datasets} options={options}/>
      </div>
    </div>
  );
};

export default TransactionChart;