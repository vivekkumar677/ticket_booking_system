import { useEffect } from "react";
import { api } from "../api/api";
import { useApp } from "../context/AppContext";

export default function AdminShowList() {
  const { shows, setShows } = useApp();

  useEffect(() => {
    api.get("/shows").then((res) => setShows(res.data.shows));
  }, [setShows]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h2>Show List</h2>
        <a href="/admin/create" className="btn btn-success">+ Create Show</a>
      </div>

      <table className="table table-bordered mt-4">
        <thead className="table-dark">
          <tr><th>Name</th><th>Start Time</th><th>Total Seats</th><th>Available Seats</th></tr>
        </thead>
        <tbody>
          {shows.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{new Date(s.start_time).toLocaleString()}</td>
              <td>{s.total_seats}</td>
              <td>{s.available_seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
