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
const _fetchIndividualSalesByCustUrl =
  "https://busse-nestjs-api.herokuapp.com/sales/cust";
const _fetchSalesDataUrl =
  "https://busse-nestjs-api.herokuapp.com/sales/distinct/cust";
const _fetchItemsDataUrl =
  "https://busse-nestjs-api.herokuapp.com/sales/distinct/item";

const currentYear = new Date().getFullYear();
const lastMonth = new Date().getMonth();
const maxDate = new Date(currentYear, lastMonth, 0);
const minDate = new Date(currentYear, lastMonth - 1, 1);

export const sales = observable({
  get token() {
    return localStorage.getItem("token");
  },
  start: localStorage.getItem("start") || minDate,
  setStart(date) {
    sales.start = date;
    if (
      new Date(sales.start) < new Date(sales.end) &&
      sales.token &&
      sales.item
    ) {
      this.fetchSummary(sales.item);
      this.fetchPeriodData();
    } else {
      this.fetchPeriodData();
    }
  },
  end: localStorage.getItem("end") || maxDate,
  setEnd(date) {
    sales.end = date;
    if (
      new Date(sales.start) < new Date(sales.end) &&
      sales.item &&
      sales.token
    ) {
      this.fetchSummary(sales.item);
      this.fetchPeriodData();
    } else {
      this.fetchPeriodData();
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
    if (sales.token) {
      axios
        .get(`${distinctCustomers_url}/${sales.start}/${sales.end}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(res => {
          sales.distinctCustomersArray = res.data[0].customer;
        });
    }
    sales.distinctCustomersArray = [];
  },
  distinctItemsArray: [],
  distinctItems() {
    if (sales.token) {
      axios
        .get(`${distinctItems_url}/${sales.start}/${sales.end}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(res => {
          sales.distinctItemsArray = res.data[0].item;
        });
    }
    sales.distinctItemsArray = [];
  },
  summary: [],
  customerDetails: [],
  itemDetails: [],
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
  fetchPeriodData() {
    sales.loading = true;

    axios
      .all([
        axios.get(`${_fetchSalesDataUrl}/${sales.start}/${sales.end}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }),
        axios.get(`${_fetchItemsDataUrl}/${sales.start}/${sales.end}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
      ])
      .then(
        axios.spread((salesData, itemsData) => {
          sales.customerDetails = salesData.data;
          sales.itemDetails = itemsData.data;

          sales.loading = false;
        })
      );
  },
  individualSales: [],
  fetchIndividualSalesByCust(cid) {
    sales.loading = true;
    axios
      .get(
        `${_fetchIndividualSalesByCustUrl}/${cid}/${sales.start}/${sales.end}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        sales.individualSales = res.data;
        sales.loading = false;
      });
  },
  fetchIndividualSalesByItem(iid) {
    sales.loading = true;
    axios
      .get(
        `${_fetchIndividualSalesByItemUrl}/${iid}/${sales.start}/${sales.end}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        sales.individualItems = res.data;
        sales.loading = false;
      });
  },
  item: "",
  setItem(item) {
    sales.item = item;
  },
  customer: "",
  setCustomer(customer) {
    sales.customer = customer;
  },
  cid: "",
  setCid(cid, customer) {
    sales.cid = cid + " | " + customer;
  },
  iid: "",
  setIid(iid, item) {
    sales.iid = iid + " | " + item;
  },
  loading: false
});
