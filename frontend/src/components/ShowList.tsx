import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";


interface Show {
  id: number;
  name: string;
  start_time: string;
  total_seats: number;
  available_seats: number;
}

export default function ShowsList() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:5000/shows")
    .then((res) => res.json())
    .then((data) => {
      setShows(data.shows);
      setLoading(false);
    })
    .catch((err) => {
        console.error("Fetch error", err);
        setLoading(false);
    })
  }, []);

  const handleBook = (show: Show) => {
    alert(`Booked for: ${show.name}`);
  };

  if(loading) {
    return (
        <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
        </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Available Shows / Trips / Movies</h2>

      <div className="row">
        {shows.map((show) => (
          <div className="col-md-4 mb-3" key={show.id}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{show.name}</Card.Title>

                <p>
                  <strong>Start Time:</strong><br />
                  {new Date(show.start_time).toLocaleString()}
                </p>

                <p>
                  <strong>Total Seats:</strong> {show.total_seats} <br />
                  <strong>Available:</strong>{" "}
                  <span
                    className={
                      show.available_seats > 0 ? "text-success" : "text-danger"
                    }
                  >
                    {show.available_seats}
                  </span>
                </p>

                <Button
                  variant="primary"
                  disabled={show.available_seats === 0}
                  onClick={() => handleBook(show)}
                >
                  {show.available_seats > 0 ? "Book Now" : "Sold Out"}
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};