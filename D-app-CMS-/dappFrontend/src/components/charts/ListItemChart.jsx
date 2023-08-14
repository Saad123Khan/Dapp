// import { Tooltip } from "bootstrap";
// import React from "react";
// import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// const ListItemChart = ({ stroke, data }) => {
//   const dataGraph = [
//     [1680484314952, 0.10696025305635136],
//     [1680484581580, 0.10694067083816847],
//     [1680484891842, 0.10696335700682093],
//     [1680485171608, 0.1067442445303754],
//     [1680485498285, 0.10663909864021609],
//     [1680485768434, 0.10659705491669805],
//     [1680486081390, 0.1063409422380933],
//     [1680486381813, 0.10582635874935721],
//     [1680486681482, 0.10516927400118009],
//     [1680486970477, 0.10542024180013695],
//     [1680487352817, 0.10538481442720178],
//     [1680487578990, 0.10535522533988327],
//     [1680487909296, 0.10580753295408253],
//     [1680488176420, 0.10584529441800225],
//     [1680488517051, 0.10597888895456022],
//     [1680488776932, 0.1061626096118387],
//   ];

//   // BTC
//   // ETH
//   // BCH
//   // XLM
//   // ATOM
//   // XRP
//   // LINK
//   return (
//     <>
//       <LineChart
//         width={140}
//         height={50}
//         data={data}
//         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//       >
//         <XAxis dataKey={0} hide />
//         <YAxis hide baseValue="dataMin" />
//         <Line
//           type="monotone"
//           dataKey={1}
//           stroke={stroke}
//           strokeWidth={2}
//           dot={false}
//         />
//       </LineChart>
//     </>
//   );
// };

// export default ListItemChart;


import { Tooltip } from "bootstrap";
import React from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const ListItemChart = ({ stroke }) => {
  const data = [
    {
      name: "name",
      value: 5,
    },
    {
      name: "name",
      value: 5,
    },
    {
      name: "name",
      value: 8,
    },
    {
      name: "name",
      value: 6,
    },
    {
      name: "name",
      value: 8,
    },
    {
      name: "name",
      value: 6,
    },
    {
      name: "name",
      value: 7,
    },
    {
      name: "name",
      value: 6,
    },
    {
      name: "name",
      value: 8,
    },
    {
      name: "name",
      value: 9,
    },
    {
      name: "name",
      value: 10,
    },
    {
      name: "name",
      value: 6,
    },
    {
      name: "name",
      value: 5,
    },
    {
      name: "name",
      value: 5,
    },
    {
      name: "name",
      value: 8,
    },
    {
      name: "name",
      value: 6,
    },
    {
      name: "name",
      value: 10,
    },
    {
      name: "name",
      value: 5,
    },
    {
      name: "name",
      value: 8,
    },
    {
      name: "name",
      value: 6,
    },
    {
      name: "name",
      value: 5,
    },
    {
      name: "name",
      value: 5,
    },
    {
      name: "name",
      value: 8,
    },
    {
      name: "name",
      value: 6,
    },
    {
      name: "name",
      value: 1,
    },
    {
      name: "name",
      value: 5,
    },
    {
      name: "name",
      value: 8,
    },
    {
      name: "name",
      value: 6,
    },
    {
      name: "name",
      value: 5,
    },
    {
      name: "name",
      value: 5,
    },
    {
      name: "name",
      value: 8,
    },
    {
      name: "name",
      value: 6,
    },
  ];

  return (
    <>
      <LineChart
        width={140}
        height={50}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" hide />
        <YAxis hide />
        <Line dataKey="value" stroke={stroke} strokeWidth={2} dot={false} />
      </LineChart>
    </>
  );
};

export default ListItemChart;