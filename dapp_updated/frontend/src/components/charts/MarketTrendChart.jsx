import React, { useEffect, useState } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    data: "",
    value: 0,
  },
  {
    data: "YEAR 1",
    value: 6500,
  },
  {
    data: "YEAR 1",
    value: 7500,
  },
  {
    data: "YEAR 1",
    value: 8000,
  },
  {
    data: "YEAR 1",
    value: 10000,
  },
  {
    data: "YEAR 1",
    value: 12000,
  },
];

const MarketTrendChart = ({ gradientColor = "rgb(22, 82, 240)", data }) => {

  const [temp,setTemp] = useState([])
  const d = [];

  useEffect(()=>{
    if(data) {
      data?.map((item,index)=>{
        d.push({
          data:item[0],
          value:item[1]
        })
      })
      setTemp(d)
    }
  },[data])
  const dataGraph = [
    [1680484314952, 0.10696025305635136],
    [1680484581580, 0.10694067083816847],
    [1680484891842, 0.10696335700682093],
    [1680485171608, 0.1067442445303754],
    [1680485498285, 0.10663909864021609],
    [1680485768434, 0.10659705491669805],
    [1680486081390, 0.1063409422380933],
    [1680486381813, 0.10582635874935721],
    [1680486681482, 0.10516927400118009],
    [1680486970477, 0.10542024180013695],
    [1680487352817, 0.10538481442720178],
    [1680487578990, 0.10535522533988327],
    [1680487909296, 0.10580753295408253],
    [1680488176420, 0.10584529441800225],
    [1680488517051, 0.10597888895456022],
    [1680488776932, 0.1061626096118387],
  ];

  const data1 = [
    {
      data: "",
      value: 0,
    },
    {
      data: "YEAR 1",
      value: 6500,
    },
    {
      data: "YEAR 1",
      value: 7500,
    },
    {
      data: "YEAR 1",
      value: 8000,
    },
    {
      data: "YEAR 1",
      value: 10000,
    },
    {
      data: "YEAR 1",
      value: 12000,
    },
  ];
  
  return (
    <>
      <div className="scroll-x">
        <article className="wallet-chart">
         {
          temp?.length > 0 &&
          <div className="">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={temp}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={"rgba(22, 82, 240, 0.2)"}
                      stopOpacity={1}
                    />
                    <stop
                      offset="95%"
                      stopColor="rgba(22, 82, 240, 0.2)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="value"
                  stroke={gradientColor}
                  strokeWidth={2}
                  fill="url(#colorUv)"
                />
                <XAxis
                  tick={false}
                  dataKey="data"
                  type="category"
                  axisLine={false}
                />
                <YAxis
                  dataKey="value"
                  tickCount={9}
                  tickFormatter={(number) => `$ ${number}`}
                  tick={false}
                  axisLine={false}
                />

                <Tooltip
                  content={<CustomTooltip />}
                  //   cursor={{
                  //     stroke: "#e11f1c",
                  //     strokeWidth: 1,
                  //     strokeDasharray: 5,
                  //   }}
                  cursor={false}
                />
                <CartesianGrid opacity={0.5} vertical={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
         }

        </article>
      </div>
    </>
  );

  function CustomTooltip({ active, payload, label }) {
    if (active) {
      return <div></div>;
    }
    return null;
  }
};

export default MarketTrendChart;
