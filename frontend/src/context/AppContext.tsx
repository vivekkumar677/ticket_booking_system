import { createContext, ReactNode, useContext, useState } from "react";
import { Show } from "../types";

interface AppContextType {
    shows: Show[];
    setShows: (shows: Show[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [shows, setShows] = useState<Show[]>([]);

    return (
        <AppContext.Provider value={{ shows, setShows }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if(!context) throw new Error("useApp must be used within an AppProvider");
    return context;
};