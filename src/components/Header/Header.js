import React from 'react';
import { addContactReducer, handleSearch } from "../../redux/slicers/usersSlice";
import { useDispatch } from "react-redux";
import './header.css'

const Header = () => {
    const dispatch = useDispatch()
    const serch = (e) => {
        dispatch(handleSearch(e.target.value))
    }

    return (
        <div className={'header'}>
            <div className={'title'}>
                <h1>contacts</h1>
            </div>
            <div className={'form'}>
                <input
                    type="text"
                    onChange={serch}
                    placeholder={'search'}
                />
                <button onClick={() => dispatch(addContactReducer())}>create new contact</button>
            </div>

        </div>
    );
};

export default Header;