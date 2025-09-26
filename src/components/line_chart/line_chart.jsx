import React,{ useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const Line_chart = ({chart_data}) => {

    const[data,set_data]=useState([["Date","Prices"]])

    useEffect(()=>{
    let data_copy =[["Date","Prices"]];
    if(chart_data.prices){
    chart_data.prices.map((item)=>{
        data_copy.push([`${new Date(item[0]).toLocaleString().slice(0,-3)}`,item[1]]);
       })
       set_data(data_copy);
        }
     },[chart_data])
  return (
    <Chart
      chartType='LineChart'
      data={(data)}
      height="100%"
      width="100%"
      legendToggle
    />
  )
}

export default Line_chart
