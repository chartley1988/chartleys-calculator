import { createContext, useContext, useState } from "react";
import { fireBaseApp } from "../firebase/firebase_config";

const UserContext = createContext(null);

export default function UserContextProvider(props){
    const [user, setUser] = useState(null);

    function getFireBaseApp(){
        console.log('Connected');
    }
    return (
        <UserContext.Provider value={{user, getFireBaseApp}}>
            {props.children}
        </UserContext.Provider>
    );
};

export const getUserContext = () => useContext(UserContext);