import React from "react";

export default function Home() {
  const backend =
    "API built using nestjs framework <typescript>, data hosted using mongodb cloud atlas, multi-stage mongodb aggregations through nestjs";
  const frontend = [
    "react <framework>",
    "react-router-dom <routing>",
    "redux & react-redux <state management>",
    "@material-ui/core & @material-ui/icons <component elements>",
    "@MuiPicker <date picker>",
    "MUIDataTable <tables>",
    "secure json web token required for all requests"
  ];
  const data = [
    {
      version: "0.8.0",
      description:
        "Added many multi-stage aggregations to the nestjs backend to fetch more data per request.",
      frontend: frontend.slice(0, 6),
      backend
    },
    {
      version: "0.5.0",
      description:
        "Added table component from Material UI for fetched tabular data",
      frontend: frontend.slice(0, 5),
      backend
    },
    {
      version: "0.4.0",
      description: "Added date picker element from Muipicker",
      frontend: frontend.slice(0, 4),
      backend
    },
    {
      version: "0.3.0",
      description: "Added components from Material UI for layout",
      frontend: frontend.slice(0, 3),
      backend
    },
    {
      version: "0.2.0",
      description: "Added redux for state management",
      frontend: frontend.slice(0, 2),
      backend
    },
    {
      version: "0.1.0",
      description: "Added sales & items component",
      frontend: frontend.slice(0, 1),
      backend
    },
    {
      version: "0.0.0",
      description: "Initial commit",
      frontend: frontend.slice(0, 1),
      backend
    }
  ];

  const styles = {
    li: {
      margin: "3rem 3rem"
    },
    title: {
      margin: "2rem 3rem"
    }
  };

  return (
    <div>
      <h1 style={styles.title}>Notes:</h1>
      <ul>
        {data.map((v, i) => (
          <li key={i} style={styles.li}>
            <b>{v.version}</b>: <i>{v.description}</i> [{v.frontend},{" "}
            {v.backend}]
          </li>
        ))}
      </ul>
    </div>
  );
}
