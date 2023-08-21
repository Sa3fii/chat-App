import { createContext, useState } from "react";
import useNotification from "../hooks/useNotification";

export const AppNotifContext = createContext();

const AppNotifProvider = ({ children }) => {

    const [notifList, setNotifList,setNotifRead] = useNotification('NOTF')
    
    const providerValue = {
        notifList,
        setNotifList,
        setNotifRead
    }

    return (
        <AppNotifContext.Provider value={providerValue}>
            {children}
        </AppNotifContext.Provider>
    )
};

export default AppNotifProvider;