# SQL Schema

CREATE TABLE IF NOT EXISTS shows (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL, 
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    total_seats INT NOT NULL DEFAULT 0,
    available_seats INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seats (
    id SERIAL PRIMARY KEY,
    show_id INT REFERENCES shows(id) ON DELETE CASCADE,
    seat_number TEXT NOT NULL,
    is_booked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(show_id, seat_number)
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  show_id INT REFERENCES shows(id) ON DELETE CASCADE,
  user_info JSONB DEFAULT '{}'::jsonb, -- store user name/email or requestor metadata
  seats_requested INT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('PENDING','CONFIRMED','FAILED')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_status_created_at ON bookings(status, created_at);