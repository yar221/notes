import React from 'react';
import './searchBar.scss'
import { Search } from 'react-bootstrap-icons';

const SeacrhBar = () => {
    return (
        <div className='search-bar'>
            <div className="search-bar__image"><Search /></div>
            <input type="text" className="search-bar__input" placeholder='Serch...' />
        </div>
    );
};

export default SeacrhBar;