import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase from '../firebase/firebase';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    function signUpWithEmail(email, password) {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                setCurrentUser(response.user);
                return response.user
            })
    } 

    function signInWithEmail(email, password) {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                setCurrentUser(response.user)
                return response.user;
            })
    }

    function signInWithGoogle() {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(response => {
                setCurrentUser(response.user)
                return response.user;
            })
    }

    function logOut() {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setCurrentUser(false);
            })
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(false)
            }
            setIsAuthenticating(false)
        })

        return () => unsubscribe;
    }, []);


    const value = {
        currentUser,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        isAuthenticating,
        logOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}            
        </AuthContext.Provider>
    );
}
