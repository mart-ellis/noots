import React, { useState } from 'react';
import firebase from '../firebase/firebase';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { SliderPicker } from 'react-color';
import { useAuth } from '../context/AuthContext';

export default function AddNoteModal({open, setOpen }) {
  const cancelButtonRef = useRef();

  function closeModal() {
    setOpen(false);
  }

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

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        id="modal"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        static
        open={open}
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md px-8 py-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-50 shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-800 dark:text-gray-50 mb-6"
              >
                Add a New Category
              </Dialog.Title>
              <div className="mt-2">
                <form onSubmit={onSubmit}>
                  <p className="text-sm text-gray-700 dark:text-gray-400 mt-1 mb-6">Please add your category name and colour below</p>
                  <div className="w-full mt-4">
                      <label className="block text-xs font-medium">Category Name</label>
                      <input required type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} placeholder="E.g finances" className="mt-1 bg-gray-100 text-gray-700 text-sm font-gray-600 py-1.5 px-2 block w-full shadow-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></input>
                  </div>

                  <div className="w-full mt-8">
                      <label className="block text-xs font-medium">Category Color</label>
                      <SliderPicker 
                          color={categoryColor}
                          onChange={(color) => {setCategoryColor(color.hex)}}
                          className="my-4"
                      />
                      

                  </div>

                  <div className="mt-6 flex">
                      <button type="submit" 
                      className="mr-3 inline-flex justify-center px-8 py-3 text-sm font-medium text-gray-100 bg-green-400 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      >Add Category</button>
                      <button type="button" 
                      onClick={closeModal} 
                      className="inline-flex justify-center px-8 py-3 text-sm font-medium text-gray-100 bg-red-400 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      >Close</button>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
