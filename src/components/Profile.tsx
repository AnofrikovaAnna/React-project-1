import React from 'react';
import { Link } from 'react-router-dom';

export const ProfilePage = () => {
    return (
        <div>
            Профиль
            <div style={{display: 'flex', gap: '30px'}}>
                <Link to="/dashboard">На главную</Link>
                <Link to="/">Выйти</Link>
            </div>
            
        </div>
    );
};