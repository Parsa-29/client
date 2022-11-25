import React, { Component } from "react";
import Chart from "react-apexcharts";

//pie chart with props data and title
interface Props {
  data: any;
  options: any;
}

const UserChart = ({ data, options }: Props) => {
  return (
    <div className="chart">
      <Chart
        options={options}
        series={data}
        type="pie"
        width="380"
        height="380"
      />
    </div>
  );
};

export default UserChart;
