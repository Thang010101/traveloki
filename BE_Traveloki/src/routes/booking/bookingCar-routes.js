const express = require("express");
const route = express.Router();

const {
  GetDatXeOto,
  BookingCar,
  SchedularChange,
  CancelBooking,
  FindBookingCarID,
  FindBookingCarMaDX,
} = require("../../controllers/bookingCar_controller");

route.get("/GetDatXeOto", GetDatXeOto);
route.post("/BookingCar", BookingCar);
route.get("/FindBookingCarID/:id", FindBookingCarID);
route.get("/FindBookingCarMaDX", FindBookingCarMaDX);
route.put("/BookingCar/SchedularChange/:id", SchedularChange);
route.delete("/CancelBooking/:MaDX", CancelBooking);

module.exports = route;
