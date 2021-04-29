import React, { useState } from 'react';
import firebase from '../firebase/firebase';
import Modal from 'react-modal';
import { SliderPicker } from 'react-color';
import { useAuth } from '../context/AuthContext';

const CategoryModal = ({ modalIsOpen, closeModal }) => {

    const [categoryName, setCategoryName] = useState('')
    const [categoryColor, setCategoryColor] = useState('#6366F1')
    const { currentUser } = useAuth();

    const onSubmit = (e) => {
        e.preventDefault();

        firebase
            .firestore()
            .collection('users')
            .doc(`${currentUser.uid}`)
            .collection('categories')
            .add({
                name: categoryName,
                color: categoryColor
            })
            .then(() => {
                console.log(`Category: ${categoryName} with color ${categoryColor} added! Congrats`);
                setCategoryName('')
                setCategoryColor('#6366F1')
                closeModal()
            })
            .catch(error => {
                console.log(`⚠️ Uh oh, error: ${error}`);
            })
    }

    Modal.setAppElement('#root')

    return (
        <Modal 
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            // style={modalStyles}
            shouldCloseOnOverlayClick={false}
            contentLabel="Add Category Modal"
            className="border-4 outline-none border-indigo-300 shadow-md rounded-lg p-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 bg-white"
        >


            <form onSubmit={onSubmit}>
                <h1 className="font-bold text-lg">Add a Custom Category</h1>
                <p className="text-sm text-gray-400 mt-1 mb-6">Please add your category name and colour below</p>
                <div className="flex flex-col">
                    <label className="font-semibold text-md text-gray-700 mb-1">Category Name</label>
                    <input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} placeholder="E.g finances" className="mb-8 border-0 border-b-2 focus:outline-none focus:border-indigo-400 text-gray-500"></input>
                </div>

                <div>
                    <label className="font-semibold text-md text-gray-700">Category Color</label>
                    <SliderPicker 
                        color={categoryColor}
                        onChange={(color) => {setCategoryColor(color.hex)}}
                        className="my-4"
                    />
                    

                </div>

                <div className="flex">
                    <button type="submit" className="mt-4 bg-indigo-500 py-3 px-5 rounded-md text-white font-bold flex-grow">Add Category</button>
                    <button type="button" onClick={closeModal} className="mt-4 ml-2 py-3 px-7 rounded-md text-gray-500 border-2 border-gray-300 font-bold">Close</button>
                </div>

            </form>
            
        </Modal>
    );
}

export default CategoryModal;
