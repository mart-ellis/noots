import React, { useState } from 'react';
import { useNotes } from '../context/NotesContext';
import useCategories from '../helpers/useCategories';
import NotesList from './NotesList';
import Sidebar from './Sidebar';


const Dashboard = () => {

    const {notes, sortBy, setSortBy} = useNotes();
    const categories = useCategories();

    const [starredFilter, setStarredFilter] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState(null);

    const handleCategoryFilter = (category) => {
        setStarredFilter(false)
        setCategoryFilter(category)
    }

    let filteredNotes = [];

    if (starredFilter) {
        filteredNotes = notes.filter(note => note.starred === true)
    } else if (categoryFilter) {
        filteredNotes = notes.filter(note => note.category === categoryFilter)
    } else {
        filteredNotes = notes
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-6 md:h-screen">
            <Sidebar setStarredFilter={setStarredFilter} setCategoryFilter={setCategoryFilter} handleCategoryFilter={handleCategoryFilter} categoryFilter={categoryFilter} starredFilter={starredFilter} />
            <NotesList notes={filteredNotes} sortBy={sortBy} setSortBy={setSortBy} categories={categories} categoryFilter={categoryFilter} starredFilter={starredFilter}/>
        </div>
    );
}

export default Dashboard;
