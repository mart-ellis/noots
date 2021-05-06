import React, { useState } from 'react';
import useCategories from '../helpers/useCategories';
import { CollectionIcon, FolderAddIcon, LightningBoltIcon, MinusCircleIcon } from '@heroicons/react/solid';
import AddCategoryModal from './AddCategoryModal';
import { useNotes } from '../context/NotesContext'; 
import firebase from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';

const CategoriesList = ({ handleCategoryFilter, categoryFilter }) => {
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);

    const openModal = () => {
        setOpenAddCategoryModal(true)
    }

    const categories = useCategories();
    const { notes } = useNotes();
    const {currentUser } = useAuth();

    const handleCategoryDel = (id) => {
        firebase
        .firestore()
        .collection('users')
        .doc(`${currentUser.uid}`)
        .collection('categories')
        .doc(`${id}`)
        .delete()
        .then(() => {
            console.log(`Category with ID: ${id} delete!`);
        })
        .catch((error) => {
            console.log(`Error removing category: ${error}`);
        })
    }

    return (
        <div className="">
            <ul className="mt-8 md:mt-12 space-y-3">
                <li className="flex items-center mb-3">
                    <CollectionIcon className="w-5 mr-2" />
                    <p className="text-sm pt-0.5 font-medium dark:text-gray-100">Categories</p>
                </li>

                <li>
                    <ul className="pl-1.5 pr-1 mt-3 max-h-60 overflow-scroll">
                    {categories && categories.map(category => {

                    const active = category.name === categoryFilter;

                    const categoryCount = notes?.map(note => note.category)
                        .reduce((acc, current) => (current === category.name ? acc + 1 : acc), 0)   

                    return (
                        <li key={category.id} className={`text-sm py-2 px-1 font-medium flex rounded-md items-center justify-between ${active ? "bg-indigo-500 text-white" : "" }`}>
                            <div className="flex items-center w-10/12" onClick={() => handleCategoryFilter(category.name)}>
                                <LightningBoltIcon className="w-4 flex-shrink-0 mr-2" style={{ color: category.color}} />
                                <div className="w-11/12">
                                    <p className="truncate">{category.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-gray-700 w-4 h-4 rounded-full text-gray-50 flex items-center justify-center">
                                    <p className="" style={{ fontSize: "9px" }}>{categoryCount}</p>
                                </div>
                                <div className="ml-1">
                                    <MinusCircleIcon className="w-3.5 text-gray-400 hover:text-red-400" onClick={() => handleCategoryDel(category.id)}/>
                                </div>
                            </div>
                        </li>
                    )

                    }
                    )}
                    </ul>
                </li>

                <li className="flex items-center mb-3" onClick={openModal}>
                    <FolderAddIcon className="w-5 mr-2" />
                    <p className="text-sm pt-0.5 font-medium dark:text-gray-100">Add Category</p>
                </li>
            </ul>

            <AddCategoryModal open={openAddCategoryModal} setOpen={setOpenAddCategoryModal} />

        </div>
    );
}

export default CategoriesList;
