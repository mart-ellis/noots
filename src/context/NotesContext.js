import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase from '../firebase/firebase';
import { useAuth } from './AuthContext';

const NotesContext = createContext();

export function useNotes() {
    return useContext(NotesContext)
}

export function NotesProvider({ children }) {
  
    
    const [notes, setNotes] = useState([]);
    const [sortBy, setSortBy] = useState('TIME_ASC')
    const { currentUser } = useAuth();
    
    useEffect(() => {
        const SORT_OPTIONS = {
            'TIME_ASC': {column: 'added', direction: 'asc'},
            'TIME_DESC': {column: 'added', direction: 'desc'},
        
            'TITLE_ASC': {column: 'title', direction: 'asc'},
            'TITLE_DESC': {column: 'title', direction: 'desc'},
        }

        if (currentUser) {
            const unsubscribe = firebase
                .firestore()
                .collection('users')
                .doc(`${currentUser.uid}`)
                .collection('notes')
                .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
                .onSnapshot((snapshot) => {
                    const fetchedNotes = snapshot.docs.map((document) => ({
                        id: document.id,
                        ...document.data()
                    }))
                    setNotes(fetchedNotes)
                })
            
            return () => unsubscribe() // drop subscription to firestore once components unmounts
        }
    }, [sortBy, currentUser])

    const value = {
        notes,
        sortBy,
        setSortBy,
    }

    return (
        <NotesContext.Provider value={value}>
            {children}            
        </NotesContext.Provider>
    );
}