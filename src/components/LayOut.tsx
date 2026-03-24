import React from 'react';
import { Link } from 'react-router-dom';

export const LayOutPage = () => {
    return (
        <div>
            Главная страница
            <div style={{display: 'flex', gap: '30px'}}>
                <Link to="/profile">Профиль</Link>
                <Link to="/">Выйти</Link>
            </div>
        </div>
    );
};