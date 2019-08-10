import React from "react";
import { connect } from 'react-redux'
import SetDates from "../components/SetDates";
import Tables from "../components/Tables";

import { fetchItemsData } from '../store/actions'

const columns = [
  {
    name: "_id.item",
    label: "Items",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    label: "ID",
    name: "_id.iid",
    options: {
      filter: true
    }
  },
  {
    label: "Qty Sold",
    name: "quantity",
    options: {
      sort: true
    }
  },
  {
    label: "Total Sales",
    name: "sales",
    options: {
      sort: true
    }
  },
  {
    label: "Total Costs",
    name: "costs",
    options: {
      sort: true
    }
  },
  {
    label: "Gross Profit Margin",
    name: "grossProfitMargin",
    options: {
      sort: true
    }
  }
];

const Items = (props) => {
  const { fetchItemsData } = props

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "stacked",
    onRowClick: (rowData, rowState) => {
      console.log(rowData, rowState)
      props.history.push({
          pathname: `/indivbycust`,
          state: {cid: '1300'}
      })
    }
  };

  return (
    <div>
      <SetDates />
      <button onClick={fetchItemsData}>Fetch Data</button>
      {props.sales.loading ? "Loading..." : <Tables options={options} columns={columns} tableName="Items" data={props.sales.itemDetails} />}
    </div>
  );
}

const mapStateToProps = ({sales}) => {
  return { sales }
}

export default connect(mapStateToProps, { fetchItemsData })(Items)