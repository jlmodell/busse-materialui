import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";

import SetDates from "../components/SetDates";
import Selector from "../components/Selector";
import SingleItemTable from "../components/SingleItemTable";

import { fetchIndividualSalesByItem } from "../store/actions";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  },
  loaderDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  selector: {
    marginTop: "2.5rem",
    marginBottom: "2.5rem"
  },
  dataTable: {
    padding: "2rem 1rem 5rem 1rem"
  },
  chart: {
    padding: "2rem 1rem 5rem 1rem",
    marginBottom: "2.5rem"
  }
}));

const _salesSummaryByItemUrl =
  "https://busse-nestjs-api.herokuapp.com/sales/summary/item/";

const SingleAnalysis = props => {
  const classes = useStyles();

  const [state] = useState({
    start: new Date(props.sales.start).toISOString().substring(0, 10),
    end: new Date(props.sales.end).toISOString().substring(0, 10),
    token: props.user.token,
    align: "right",
    numOfDays:
      (new Date(props.sales.end).getTime() -
        new Date(props.sales.start).getTime()) /
      (1000 * 60 * 60 * 24)
  });

  const [item, setItem] = useState("");
  const [summary, setSummary] = useState([]);

  const handleChange = event => {
    setItem(event.target.value);
  };

  const fetchData = () => {
    axios
      .get(`${_salesSummaryByItemUrl}${item}/${state.start}/${state.end}`, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      })
      .then(res => {
        const data = res.data;

        setSummary(data);
      });
  };

  const renderLoader = () => {
    return (
      <div className={classes.loaderDiv}>
        <CircularProgress className={classes.progress} />
      </div>
    );
  };

  const linkIndSales = () => {
    props.fetchIndividualSalesByItem(summary[0]._id.iid);

    props.history.push({
      pathname: `/indivbyitem`,
      state: {
        iid: summary[0]._id.iid,
        iname: summary[0]._id.item
      }
    });
  };

  const renderTable = () => {
    return (
      <div className={classes.dataTable}>
        <SingleItemTable
          summary={summary}
          start={state.start}
          end={state.end}
          numOfDays={state.numOfDays}
          align={state.align}
          linkIndSales={linkIndSales}
        />
      </div>
    );
  };

  return (
    <div>
      <SetDates />

      <div className={classes.loaderDiv}>
        <div className={classes.selector}>
          <Selector
            label="Item"
            helperText="Choose an Item to Analyze"
            handleChange={handleChange}
            item={item}
          />
        </div>
        <Button variant="outlined" onClick={fetchData}>
          Fetch Data
        </Button>

        {loading && renderLoader()}
        <div className="container">{summary.length > 0 && renderTable()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ sales, user }) => {
  return { sales, user };
};

export default connect(
  mapStateToProps,
  { fetchIndividualSalesByItem }
)(SingleAnalysis);
