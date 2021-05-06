import React, {useState} from 'react';
import firebase from '../firebase/firebase';
import moment from 'moment';
import useCategories from '../helpers/useCategories';
import { useAuth } from '../context/AuthContext';
import { Switch } from '@headlessui/react';


const AddNote = ({ closeModal }) => {

    const categories = useCategories();
    const { currentUser } = useAuth();
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('General')
    const [starred, setStarred] = useState(false)

    function onSubmit(e) {
        e.preventDefault();

        firebase
            .firestore()
            .collection('users')
            .doc(currentUser.uid)
            .collection('notes')
            .add({
                title, 
                content,
                category,
                added: moment().format('YYYYMMDDHHmm'),
                starred
            })
            .then(() => {
                setTitle('')
                setContent('')
                setCategory('')
                setStarred(false)
                closeModal()
            })
    }

    return (
        <form onSubmit={onSubmit} className="mt-2 text-gray-800 dark:text-gray-300">

            <div className="w-full mt-4">
                <label htmlFor="title" className="block text-xs font-medium">Title</label>
                <input required type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 bg-gray-100 text-gray-700 text-sm font-gray-600 py-1.5 px-2 block w-full shadow-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div className="w-full mt-4">
                <label htmlFor="content" className="block text-xs font-medium">Content</label>
                <textarea required name="content" rows="10" value={content} onChange={e => setContent(e.target.value)} className="mt-1 bg-gray-100 text-gray-700 text-sm font-gray-600 py-1.5 px-2 block w-full shadow-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
            </div>
            <div className="w-full mt-4 grid grid-cols-4 gap-4 text-sm">
                <div className="col-span-3">
                    <label htmlFor="category" className="block text-xs font-medium">Category</label>
                    <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 max-w-full min-w-full px-0.5 py-1 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option key="general" value="general">General</option>
                        {categories && categories.map(category => {
                            let capitalized = category.name.charAt(0).toUpperCase() + category.name.slice(1)
                            return <option key={category.id} value={category.name}>{capitalized}</option>
                        })}
                    </select>

                </div>

                <div className="col-span-1">
                    <Switch.Group>
                        <div className="flex-col items-center">
                            <Switch.Label passive className="block text-xs font-medium">Starred</Switch.Label>
                            <Switch
                            checked={starred}
                            onChange={setStarred}
                            className={`${
                                starred ? "bg-indigo-600" : "bg-gray-400"
                            } mt-1.5 relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                            <span
                                className={`${
                                starred ? "translate-x-6" : "translate-x-1"
                                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                            />
                            </Switch>
                        </div>
                    </Switch.Group>                 
                </div>

            </div>
            <div className="mt-6 flex">
                <button 
                    type="submit"
                    className="mr-3 inline-flex justify-center px-8 py-3 text-sm font-medium text-gray-100 bg-green-400 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                    Add Note
                </button>
                <button
                    type="button"
                    className="inline-flex justify-center px-8 py-3 text-sm font-medium text-gray-100 bg-red-400 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default AddNote;
