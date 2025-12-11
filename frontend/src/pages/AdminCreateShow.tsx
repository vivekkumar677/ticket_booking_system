import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminCreateShow() {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [totalSeats, setTotalSeats] = useState(40);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await api.post("/shows", { name, start_time: startTime, total_seats: totalSeats });
      navigate("/admin");
    } catch {
      setError("Error creating show");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Show / Trip</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mt-3">
        <label className="form-label">Show Name</label>
        <input className="form-control" onChange={(e) => setName(e.target.value)} />

        <label className="form-label mt-3">Start Time</label>
        <input type="datetime-local" className="form-control" onChange={(e) => setStartTime(e.target.value)} />

        <label className="form-label mt-3">Total Seats</label>
        <input type="number" className="form-control" value={totalSeats} onChange={(e) => setTotalSeats(Number(e.target.value))} />

        <button className="btn btn-primary mt-4" onClick={submit}>Create</button>
      </div>
    </div>
  );
}
