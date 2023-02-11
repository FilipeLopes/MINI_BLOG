//import firebase
import{getAuth, signInWithEmailAndPassword} from 'firebase/auth';
//import hooks react
import { useState, useEffect } from 'react';

export const useLogIn = () =>{
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //cleanup - avoid memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }
    const login = async (data) =>{
        checkIfIsCancelled();
        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false);
        } catch (error) {
            let systemErrorMessage;
            if(error.message.includes("user-not-found")){
                systemErrorMessage ="User not found.";

            }else if(error.message.includes("wrong-password")){
                systemErrorMessage="Wrong password.";
            }else{
                systemErrorMessage="An error has been ocurred. Please, try again later.";
            }
            setError(systemErrorMessage);
            setLoading(false);
        }
        

    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return{
        auth,
        login,
        error,
        loading
    }
}