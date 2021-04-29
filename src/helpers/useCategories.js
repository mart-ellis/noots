import { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';

function useCategories() {

  const [categories, setCategories] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = firebase
        .firestore()
        .collection('users')
        .doc(`${currentUser.uid}`)
        .collection('categories')
        .onSnapshot((snapshot) => {
            const fetchedCategories = snapshot.docs.map((document) => {
              return (
                {
                  id: document.id,
                  ...document.data()
                }
            )})
            setCategories(fetchedCategories)
        })

    return () => unsubscribe() // drop subscription to firestore once components unmounts
  }, [currentUser.uid]);

  return categories
}

export default useCategories;