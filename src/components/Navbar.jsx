import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Dock from './Dock';
import { User, FolderGit2, Sparkles, Mail } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        { icon: <User className="dock-svg" />, label: 'About', onClick: () => navigate('/') },
        { icon: <FolderGit2 className="dock-svg" />, label: 'Projects', onClick: () => navigate('/projects') },
        { icon: <Sparkles className="dock-svg" />, label: 'Others', onClick: () => navigate('/others') },
        { icon: <Mail className="dock-svg" />, label: 'Contacts', onClick: () => navigate('/contacts') },
    ];

    return (
        <>
            <nav className="nav-container">
            </nav>

            <Dock
                items={items}
            />
        </>
    );
};

export default Navbar;
