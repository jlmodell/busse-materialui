import React from "react";

export default function Home() {
  const backend = "Built with nestjs <typescript>";
  const frontend = [
    "react <framework>",
    "react-router-dom <routing>",
    "redux & react-redux <state management>",
    "@material-ui/core & @material-ui/icons <component elements>",
    "@MuiPicker <date picker>",
    "MUIDataTable <tables>"
  ];
  const data = [
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
