import React from 'react';
import SeacrhBox from '../SearchBox/SeacrhBox';
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

            {/* компонент який здійснює пошук */}
            <SeacrhBox />
        </header>
    );
};

export default Header;