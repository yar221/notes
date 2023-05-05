import React from 'react';
import SeacrhBar from '../SearchBox/SearchBar';
import './header.scss'
import { PencilSquare, Plus, Trash } from 'react-bootstrap-icons';

const Header = () => {
    return (
        <header>
            <div className="tools">
                <div className="tools__item">
                    <Plus />
                </div>
                <div className="tools__item">
                    <Trash />
                </div>
                <div className="tools__item">
                        <PencilSquare />
                </div>
            </div>

            <SeacrhBar />
        </header>
    );
};

export default Header;