import { observable } from "mobx";
import axios from "axios";

const distinctItems_url =
  "https://busse-nestjs-api.herokuapp.com/sales/distinct/item-list";
const distinctCustomers_url =
  "https://busse-nestjs-api.herokuapp.com/sales/distinct/cust-list";
const _salesSummaryByItemUrl =
  "https://busse-nestjs-api.herokuapp.com/sales/summary/item";
const _fetchIndividualSalesByItemUrl =
  "https://busse-nestjs-api.herokuapp.com/sales/item";

const currentYear = new Date().getFullYear();
const lastMonth = new Date().getMonth();
const maxDate = new Date(currentYear, lastMonth, 0);
const minDate = new Date(currentYear, lastMonth - 1, 1);

export const sales = observable({
  start: localStorage.getItem("start") || minDate,
  setStart(date) {
    sales.start = date;
    if (sales.item) {
      this.fetchSummary(sales.item);
    }
  },
  end: localStorage.getItem("end") || maxDate,
  setEnd(date) {
    sales.end = date;
    if (sales.item) {
      this.fetchSummary(sales.item);
    }
  },
  get numOfDays() {
    return (
      (new Date(sales.end).getTime() - new Date(sales.start).getTime()) /
      (1000 * 60 * 60 * 24)
    );
  },
  distinctCustomersArray: [],
  distinctCustomers() {
    axios
      .get(`${distinctCustomers_url}/${sales.start}/${sales.end}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => {
        sales.distinctCustomersArray = res.data[0].customer;
      });
  },
  distinctItemsArray: [],
  distinctItems() {
    axios
      .get(`${distinctItems_url}/${sales.start}/${sales.end}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => {
        sales.distinctItemsArray = res.data[0].item;
      });
  },
  summary: [],
  individualItems: [],
  chartCustomers: [],
  chartSales: [],
  fetchSummary(iid) {
    sales.loading = true;

    axios
      .all([
        axios.get(
          `${_salesSummaryByItemUrl}/${iid}/${sales.start}/${sales.end}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        ),
        axios.get(
          `${_fetchIndividualSalesByItemUrl}/${iid}/${sales.start}/${sales.end}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        )
      ])
      .then(
        axios.spread((summaryRes, detailsRes) => {
          let c = [];
          let s = [];

          detailsRes.data.forEach(x => {
            c.push(x._id.customer);
            s.push(x.sales);
          });

          sales.summary = summaryRes.data;
          sales.individualItems = detailsRes.data;
          sales.chartCustomers = c;
          sales.chartSales = s;
          sales.loading = false;
        })
      );
  },
  customerDetails:
    JSON.parse(localStorage.getItem("customerDetailsArray")) || [],
  itemDetails: JSON.parse(localStorage.getItem("itemDetailsArray")) || [],
  individualSales:
    JSON.parse(localStorage.getItem("individualSalesByCustomer")) || [],
  item: "",
  setItem(item) {
    sales.item = item;
  },
  customer: "",
  setCustomer(customer) {
    sales.customer = customer;
  },
  loading: false
});
