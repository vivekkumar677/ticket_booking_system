import { useEffect } from "react";
import { api } from "../api/api";
import { useApp } from "../context/AppContext";
import { Card, Button } from "react-bootstrap";

export const Home = () => {
  const { shows, setShows } = useApp();

  useEffect(() => {
    api.get("/shows").then(res => setShows(res.data.shows));
  }, [setShows]);

  return (
    <div className="container mt-5">
      <h2>Available Shows</h2>
      <div className="row mt-4">
        {shows.map(show => (
          <div className="col-md-4 mb-3" key={show.id}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{show.name}</Card.Title>
                <p>Start: {new Date(show.start_time).toLocaleString()}</p>
                <p>Available: <strong>{show.available_seats}</strong></p>
                <Button href={`/booking/${show.id}`} disabled={show.available_seats === 0}>
                  {show.available_seats > 0 ? "Book Seats" : "Sold Out"}
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
