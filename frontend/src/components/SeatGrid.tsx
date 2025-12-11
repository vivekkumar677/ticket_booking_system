interface Props {
  seats: { seat_number: number; is_booked: boolean }[];
  selected: number[];
  toggle: (num: number) => void;
}

export default function SeatGrid({ seats, selected, toggle }: Props) {
  return (
    <div className="d-grid" style={{ gridTemplateColumns: "repeat(8, 1fr)", gap: "10px" }}>
      {seats.map(s => (
        <button
          key={s.seat_number}
          className={`btn ${s.is_booked ? "btn-danger" : selected.includes(s.seat_number) ? "btn-success" : "btn-outline-secondary"}`}
          disabled={s.is_booked}
          onClick={() => toggle(s.seat_number)}
        >
          {s.seat_number}
        </button>
      ))}
    </div>
  );
}
