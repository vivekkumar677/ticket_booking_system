import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import AdminCreateShow from "../pages/AdminCreateShow";
import AdminShowList from "../pages/AdminShowList";
import BookingPage from "../pages/BookingPage";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminShowList />} />
            <Route path="/admin/create" element={<AdminCreateShow />} />
            <Route path="/booking/:id" element={<BookingPage />} />
        </Routes>
    )
}
