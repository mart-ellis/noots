import React from 'react';
import Note from './Note';
import EmptyBox from '../assets/box.png'
import { AnimatePresence } from 'framer-motion';

const NotesList = ({notes, sortBy, setSortBy, categories, categoryFilter, starredFilter }) => {
    const notesFound = !!notes.length;

    if (notesFound) {
        return (
            <div className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 p-6 pb-20 md:p-12 md:pb-0 md:col-span-4 xl:col-span-5 max-h-full md:overflow-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-700 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{categoryFilter ? categoryFilter : starredFilter ? 'Important' : 'All Notes'}</h1>
                    <div>
                        <label></label>
                        <select value={sortBy} onChange={(e) => { setSortBy(e.target.value )}} className="text-sm text-gray-800 font-medium border border-gray-300 rounded-md p-0.5 hover:ring-2 hover:ring-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                            <option value="TIME_DESC">Newest</option>
                            <option value="TIME_ASC">Oldest</option>
                            <option value="TITLE_ASC">A-Z (Title)</option>
                            <option value="TITLE_DESC">Z-A (Title)</option>
                        </select>
                    </div>
                </div>
                <ol className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-5">
                    <AnimatePresence >
                        
                        {notes?.map(note => {
                            const category = categories?.find(category => category.name === note.category)
                            return <Note note={note} key={note.id} color={category?.color} category={category?.name}/>
                        })}
                    </AnimatePresence>
                </ol>
            </div>
        );
    } else {
        return (
            <div className="col-span-5 h-full flex flex-col items-center justify-center dark:bg-gray-700">
                <img src={EmptyBox} alt="Empty Box" className="max-w-xs mb-4" />
                <h1 className="text-center max-w-lg font-semibold text-2xl text-gray-800 dark:text-gray-50">Uh oh, no notes found! Add one or try another category 🚀</h1>
            </div>
        )

    }


}

export default NotesList;
