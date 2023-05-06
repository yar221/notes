import React from 'react';
import './contentBar.scss';
import Sidebar from '../Sidebar/Sidebar';
import Workspace from '../Workspace/Workspace';

//компонент який з'єдную sidebar та workspace
const ContentBar = () => { 
    return (
        <div className='contentbar'>
            <Sidebar />
            <Workspace />
        </div>
    );
};

export default ContentBar;