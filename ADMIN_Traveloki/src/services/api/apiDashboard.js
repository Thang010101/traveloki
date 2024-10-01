import axios from "../axiosCustomize.js"

const fetchHistoryCar = async () => {
  const URL_BACKEND = "/api/GetHistoryCar";
  return axios.get(URL_BACKEND);
}

const fetchHistoryTrain = async () => {
  const URL_BACKEND = "/api/GetLichSuDatTau";
  return axios.get(URL_BACKEND);
}

const fetchHistoryBus = async () => {
  const URL_BACKEND = "/api/GetHistoryBus";
  return axios.get(URL_BACKEND);
}

export {
  fetchHistoryCar, fetchHistoryTrain, fetchHistoryBus
}