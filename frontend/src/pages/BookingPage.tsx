import { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import SeatGrid from "../components/SeatGrid";

export default function BookingPage() {
  const { id } = useParams();
  const [seats, setSeats] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/shows/${id}`).then(res => {
      const totalSeats = res.data.show.total_seats;
      const available = res.data.show.available_seats;
      const seatList = Array.from({ length: totalSeats }, (_, i) => ({
        seat_number: i + 1,
        is_booked: i >= available
      }));
      setSeats(seatList);
    });
  }, [id]);

  const toggleSeat = (num: number) => {
    setSelected(prev => prev.includes(num) ? prev.filter(s => s !== num) : [...prev, num]);
  };

  const bookSeats = async () => {
    try {
      const res = await api.post(`/shows/${id}/book`, { seats: selected });
      setStatus(res.data.status);
      if (res.data.status === "CONFIRMED") {
        alert("Booking Confirmed! Redirecting to home page...");
        setTimeout(() => navigate("/")); // ✅ redirect to Home
      }
    } catch (err) {
      console.error(err);
      setStatus("FAILED");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Booking Seats</h2>
      <SeatGrid seats={seats} selected={selected} toggle={toggleSeat} />
      <button className="btn btn-primary mt-3" onClick={bookSeats}>Confirm Booking</button>
      {status && <div className="alert alert-info mt-2">Status: {status}</div>}
    </div>
  );
}
