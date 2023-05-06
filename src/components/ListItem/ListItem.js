import React, { useContext } from 'react';
import './listItem.scss';
import Context from '../../context/context';

const ListItem = ({note}) => {
    const {setSelectedNote, selectedNote} = useContext(Context)

    //налаштування формата дати
    const options = { 
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        numericSeparator: '.'
    };
    const formattedDate = note.date.toLocaleString('ua-US', options);

    return (
        <li className='listitem' onClick={() => setSelectedNote(note)} style={{backgroundColor: selectedNote.id === note.id && '#E1E1DF'}}>
            <h3 className="listitem__title">{note.title}</h3>
            <div className="listitem__block block">
                <div className="block__time">{formattedDate}</div>
                <div className="block__excerpt">{note.text}</div>
            </div>
        </li>
    );
};

export default ListItem;