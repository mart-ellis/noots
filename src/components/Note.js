import React from 'react';
import {motion} from 'framer-motion'
import moment from 'moment';
import deleteNote from '../helpers/deleteNote';
import updateStarred from '../helpers/updateStarred';
import { useAuth } from '../context/AuthContext';
import Star from './Star';
import { TrashIcon } from '@heroicons/react/solid';

const Note = ({ note, color }) => {
    const {currentUser} = useAuth();

    const { title, content, added, id, starred } = note;

    const addedFormatted = moment(added, 'YYYYMMDDHHmm').format('Do MMM YY')

    return (
        <motion.div 
        initial={{ scale: 0.2, opacity:0.2 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0.2, scale: 0.2 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15
        }}
        className="container h-72 relative bg-indigo-500 text-gray-50 dark:bg-gray-800 rounded-md p-3 shadow-md flex flex-col justify-between">
            <div className="rounded-l-sm w-6 h-3.5 absolute top-6 shadow-sm right-0" style={{ backgroundColor: color}}></div>
            <div className="overflow-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold clamp-1 my-2">{title}</h1>
                </div>
                <div className="mt-1 mb-3 overflow-auto">
                    <p className="text-sm font-normal break-words leading-6 dark:text-gray-400">{content}</p>
                </div>
            </div>
            <div className="flex justify-between items-center px-2 pt-1 text-indigo-300 z-10 bg-indigo-500 dark:bg-gray-800 dark:text-gray-400">
                <div className="w-1/3 flex justify-start">
                    <p className="text-xs font-light whitespace-nowrap">{addedFormatted}</p>
                </div>
                <div className="w-1/3 flex justify-center">
                    <button onClick={() => updateStarred(currentUser.uid, id, !starred)} className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md">
                        <Star starred={starred} className="w-5 text-indigo-400" />
                    </button>
                </div>
                <div className="w-1/3 flex justify-end">
                    <button type="button" onClick={() => deleteNote(currentUser.uid, id)} className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md">
                        <TrashIcon className="w-5 text-red-400" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default Note;
