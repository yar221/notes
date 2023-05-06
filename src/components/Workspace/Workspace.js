import React, { useContext } from 'react';
import './workspace.scss';
import Context from '../../context/context';

const Workspace = () => {
    const {selectedNote} = useContext(Context)

    //перевірка, якщо об'єкт пустий, то ми нічого е виводемо на єкран
    if(Object.keys(selectedNote).length === 0){
        return
    }

    const {date, title, text} = selectedNote 
    
    //налаштування формата дати
    const options = { 
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    const formattedDate = date.toLocaleString('en-US', options);

    return (
        <div className='workspace'>
            <p className="workspace__date">{formattedDate}</p>
            <h3 className="workspace__title">{title}</h3>
            <p className="workspace__text">{text}</p>
        </div>
    );
};

export default Workspace;