import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom'
import { LogoutIcon, DocumentAddIcon } from '@heroicons/react/outline';
import { HomeIcon, SparklesIcon } from '@heroicons/react/solid';
import useDarkMode from '../helpers/useDarkMode';
import logo from '../assets/logo.svg' 
import logoWhite from '../assets/logoWhite.svg' 
import CategoriesList from './CategoriesList'; 
import AddNoteModal from './AddNoteModal';

const Sidebar = ({ setStarredFilter, setCategoryFilter, handleCategoryFilter, categoryFilter, starredFilter }) => {
    const { logOut, currentUser } = useAuth();
    const history = useHistory();
    const [error, setError] = useState('');
    const [colorTheme, setTheme]= useDarkMode();
    const [openAddNoteModal, setOpenAddNoteModal] = useState(false);

    const handleLogOut = async () => {
        setError('')

        try {
            await logOut();
            history.push("/login")

        } catch (error) {
            setError('Failed to log out')
            setError(error)
        }

    }

    if (error) {
        console.log(error);
    }

    const userFirstName = currentUser?.displayName?.split(' ')[0];

    const handleShowAllNotes = () => {
        setStarredFilter(false)
        setCategoryFilter(null)
    }

    const handleShowStarred = () => {
        setCategoryFilter(null)
        setStarredFilter(true)
    }

    const allNotesActive = !starredFilter && !categoryFilter
    const starredActive = starredFilter;

    return (
        <div className="col-span-1 md:col-span-2 xl:col-span-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 pb-6 md:pb-0">
            <div className="w-4/5 m-auto pt-10 flex flex-col justify-between h-full">
                <div className="order-last md:order-first">
                    <div className="hidden md:block">
                        <div className="flex items-center justify-center my-10 dark:hidden">
                            <img src={logo} alt="Logo" className="w-10 h-10"/>
                        </div>
                        <div className="items-center justify-center my-10 hidden dark:flex">
                            <img src={logoWhite} alt="Logo" className="w-10 h-10"/>
                        </div>
                    </div>

                    <div className="w-full flex justify-center items-center fixed bottom-2 -left-1/2 transform translate-x-1/2 z-50 md:relative md:bottom-0 md:left-0 md:transform-none">
                        <button onClick={() => {setOpenAddNoteModal(true)}} className="flex items-center justify-center text-sm font-semibold w-4/6 md:w-4/5 py-4 md:py-3 px-2 text-indigo-100 bg-indigo-500 rounded-md focus:shadow-outline hover:bg-indigo-500">
                            <DocumentAddIcon className="w-5 mr-3"/>
                            <span>New Note</span>
                        </button>
                    </div>

                    

                    <ul className="mt-10">
                        <li className={`flex py-2 px-1 rounded-md items-center mb-3 ${allNotesActive ? 'bg-indigo-500 text-white' : ''}`} onClick={handleShowAllNotes}>
                            <HomeIcon className="w-5 mr-2" />
                            <p className="text-sm pt-0.5 font-medium dark:text-gray-100">All Notes</p>
                        </li>
                        <li className={`flex py-2 px-1 rounded-md items-center mb-3 ${starredActive ? 'bg-indigo-500 text-white' : ''}`} onClick={handleShowStarred}>
                            <SparklesIcon className="w-5 mr-2" />
                            <p className="text-sm pt-0.5 font-medium dark:text-gray-100">Important</p>
                        </li>
                    </ul>

                    <CategoriesList handleCategoryFilter={handleCategoryFilter} categoryFilter={categoryFilter} />
                </div>


                <div className="flex justify-between mb-2 order-first md:order-last">

                    <div className="order-first md:hidden">
                        <img src={logoWhite} alt="Logo" className="w-7 hidden dark:block" />
                        <img src={logo} alt="Logo" className="w-7 dark:hidden" />
                    </div>

                    <div className="flex md:w-full md:justify-between">
                        <div className="flex items-center order-last md:order-first">
                            <div className="w-6">
                                {currentUser.photoURL && (<img className="rounded-full" src={currentUser.photoURL} alt="User"></img>)}
                            </div>
                            {userFirstName && (<p className="text-xs font-medium ml-3">{`${userFirstName}'s notes`}</p>)}
                        </div>
                        <div className="flex order-first md:order-last">
                            <button type="button" onClick={() => setTheme(colorTheme)} className="focus:outline-none">{colorTheme === 'dark' ? '🌒' : '☀️'}</button>
                            
                            <div className="flex items-center">
                                <button type="button" onClick={handleLogOut}>
                                    <LogoutIcon className="w-5 ml-2 text-gray-800 dark:text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <AddNoteModal open={openAddNoteModal} setOpen={setOpenAddNoteModal} />
        </div>
    );
}

export default Sidebar;
