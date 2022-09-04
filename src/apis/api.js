import axios from "axios";
// import https from "https";
const AxioConnection = axios.create({
  // baseURL: "http://aris.ut.ac.ir/spuserapi/",

  // baseURL: "http://utapi.ponya.ir",
  baseURL: "https://www.ponya.ir/api18211",
  // baseURL: "http://127.0.0.1:57711",

});
const AxioConnectionGermany = axios.create({
  // baseURL: "http://aris.ut.ac.ir/spuserapi/",

  // baseURL: "http://utapi.ponya.ir",
  baseURL: "https://inf.ponya.ir/api18211",

});
// const Agent = new https.Agent({
//   rejectUnauthorized: false
// })
// const AxioConnectionGermany = axios.create()
// AxioConnectionGermany.defaults.baseURL = "https://inf.ponya.ir/api18211"
// AxioConnectionGermany.defaults.httpsAgent = Agent

export { AxioConnection, AxioConnectionGermany }
// export { AxioConnection }