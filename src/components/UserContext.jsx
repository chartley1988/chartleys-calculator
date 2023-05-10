import { createContext, useContext, useState } from "react";
import { fireBaseApp } from "../firebase/firebase_config";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'

const UserContext = createContext(null);

export default function UserContextProvider(props){
    const [user, setUser] = useState(null);

    async function signIn() {
        var provider = new GoogleAuthProvider();
        await signInWithPopup(getAuth(), provider);
        setUser(getAuth().currentUser.displayName)
    }

    function signOutUser() {
        signOut(getAuth());
        setUser(null);
    }

    return (
        <UserContext.Provider value={{user, signIn, signOutUser}}>
            {props.children}
        </UserContext.Provider>
    );
};

export const getUserContext = () => useContext(UserContext);