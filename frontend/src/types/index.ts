
export interface Show {
    id: number;
    name: string;
    start_time: string;
    total_seats: number;
    available_seats: number;
}

export interface Seat {
    seat_number: number;
    is_booked: boolean;
}

export interface Booking {
    status: "PENDING" | "CONFIRMED" | "FAILED";
}