import firebase from '../firebase/firebase';

const deleteNote = (userID, id) => {
    firebase
        .firestore()
        .collection('users')
        .doc(userID)
        .collection('notes')
        .doc(id)
        .delete()
        .then(() => {
            console.log(`Document with ID: ${id} delete!`);
        })
        .catch((error) => {
            console.log(`Error removing document: ${error}`);
        })
}

export default deleteNote;