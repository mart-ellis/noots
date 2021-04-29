import firebase from '../firebase/firebase';

const updateStarred = (userID, id, change) => {
    firebase
        .firestore()
        .collection('users')
        .doc(userID)
        .collection('notes')
        .doc(id)
        .update({
            starred: change
        })
        .then(() => {
            console.log(`Document with ID: ${id} updated!`);
        })
        .catch((error) => {
            console.log(`Error updating document: ${error}`);
        })
}

export default updateStarred;
