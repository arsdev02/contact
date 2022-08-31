import React from 'react';
import { deleteContactReducer, editContactReducer } from "../../redux/slicers/usersSlice";
import { useDispatch, useSelector } from "react-redux";

import './output.css'
const Output = () => {
    const dispatch = useDispatch()
    const { sortUserList, searchResults } = useSelector(state => state.users)
    const details = (data) => {
        alert(`
            name: ${data.name}
            phone: ${data.phone}
            email: ${data.email}
        `)
    }
    return (
        <div className={'container'}>
            <div className={'search-block'}
                style={searchResults.length > 0 ? { display: 'flex' } : { display: 'none' }}
            >
                {searchResults && searchResults.map((el) => {
                    return (
                        <div
                            className={'box'}
                            key={el.id}>
                            <div className="box__item">
                                <p onClick={() => details(el)}>{el.name}</p>
                                <div className="box__item-btns">
                                    <button className='btn-edit' onClick={() => dispatch(editContactReducer(el.id))}>edit</button>
                                    <button className='btn-delete' onClick={() => dispatch(deleteContactReducer(el.id))}>delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div
                className={'contacts-block'}
                style={searchResults.length > 0 ? { display: 'none' } : { display: 'block' }}
            >
                {sortUserList && sortUserList.map((el, index) => {
                    return (
                        <div
                            className={'box'}
                            key={index}
                        >
                            {el.list.length > 0 ? <p className={'box__title'}>{el.letter}</p> : null}
                            {el.list.map((item) => {
                                return (
                                    <div
                                        className={'box__item'}
                                        key={item.id}>
                                        <p onClick={() => details(item)}>{item.name}</p>
                                        <div className={'box__item-btns'}>
                                            <button className='btn-edit' onClick={() => dispatch(editContactReducer(item.id))}>edit</button>
                                            <button className='btn-delete' onClick={() => dispatch(deleteContactReducer(item.id))}>delete</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Output;