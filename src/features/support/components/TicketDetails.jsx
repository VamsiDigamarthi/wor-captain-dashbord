import React from "react";

export default function TicketDetails({
  ticketId,
  rideId,
  dateTime,
  paymentMethod,
  amountCharged,
  refundAmount,
}) {
  return (
    <div className="p-2 rounded-2xl bg-white shadow-2xl w-full flex flex-col gap-2">
      <h2 className="font-bold text-2xl">Ticket Details</h2>
      <p className="text-gray-600">Ticket ID: #{ticketId}</p>

      <div>
        <h2 className="text-gray-600 font-bold">Ride Details</h2>

        <p className="flex items-center justify-between w-full">
          <span className="text-gray-500">Ride Id</span>
          <span className="text-black font-semibold">{rideId}</span>
        </p>
        <p className="flex items-center justify-between w-full">
          <span className="text-gray-500">Date & Time</span>
          <span className="text-black font-semibold">{dateTime}</span>
        </p>
        <p className="flex items-center justify-between w-full">
          <span className="text-gray-500">Payment Method</span>
          <span className="text-black font-semibold">{paymentMethod}</span>
        </p>
      </div>
      <div>
        <h2 className="text-gray-600 font-bold">Refund Information</h2>

        <p className="flex items-center justify-between w-full">
          <span className="text-gray-500">Amount Charged</span>
          <span className="text-black font-semibold">{amountCharged}</span>
        </p>
        <p className="flex items-center justify-between w-full">
          <span className="text-gray-500">Refund Amount</span>
          <span className="text-black font-semibold">{refundAmount}</span>
        </p>
      </div>
    </div>
  );
}
