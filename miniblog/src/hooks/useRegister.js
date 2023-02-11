//Imports from firebase
import { db } from "../firebase/config";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

//Hooks from react
import { useState, useEffect } from "react";

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    
    //Clean up - avoid memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    //Register
    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            
            await updateProfile(user, { displayName: data.displayName });
            
            
            setLoading(false);
            window.location.reload();

            return user;

        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage

            if (error.message.includes("password")) {
                systemErrorMessage = "Password must contain 6 characters";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "Email already registered";
            } else {
                systemErrorMessage = "An error has been ocurred. Please, try again later.";
            }
            setLoading(false);
            setError(systemErrorMessage);

        }

    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading
    }
}




