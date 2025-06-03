import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/ui/TimeRangePicker.css";

const TimeRangePicker = ({
  setStartBookingTime,
  setEndBookingTime,
  startBookingTime,
  endBookingTime,
}: {
  setStartBookingTime: any;
  setEndBookingTime: any;
  startBookingTime: any;
  endBookingTime: any;
}) => {
  // Hàm xử lý thay đổi giờ
  const handleChange = (date: any) => {
    if (!startBookingTime || (startBookingTime && endBookingTime)) {
      setStartBookingTime(date);
      setEndBookingTime(null); // Reset ngày kết thúc nếu thay đổi ngày bắt đầu
    } else {
      setEndBookingTime(date);
    }
  };

  return (
    <div>
      <div>
        <label>Chọn giờ bắt đầu:</label>
        <DatePicker
          selected={startBookingTime}
          onChange={handleChange}
          showTimeSelect
          timeIntervals={15} // Tùy chọn khoảng cách thời gian
          timeFormat="HH:mm"
          dateFormat="HH:mm" // Chỉ hiển thị giờ và phút
          placeholderText="Chọn giờ bắt đầu"
          showTimeSelectOnly
        />
      </div>

      <div>
        <label>Chọn giờ kết thúc:</label>
        <DatePicker
          selected={endBookingTime}
          onChange={handleChange}
          showTimeSelect
          timeIntervals={15} // Khoảng cách thời gian 15 phút
          timeFormat="HH:mm"
          dateFormat="HH:mm" // Chỉ hiển thị giờ và phút
          placeholderText="Chọn giờ kết thúc"
          showTimeSelectOnly
        />
      </div>

      <div>
        {startBookingTime && endBookingTime
          ? `Khoảng thời gian: ${startBookingTime.toLocaleTimeString()} - ${endBookingTime.toLocaleTimeString()}`
          : ""}
      </div>
    </div>
  );
};

export default TimeRangePicker;
