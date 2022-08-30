import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    getUsers,
    sortReducer, handleSearch,
} from "../../redux/slicers/usersSlice";
import Header from "../Header/Header";
import Output from "../Output/Output";

const Main = () => {
    const dispatch = useDispatch()
    const {usersList} = useSelector(state => state.users)
    useEffect(() => {
        if (!localStorage.getItem('persist:root')) {
            dispatch(getUsers())
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(sortReducer())
        dispatch(handleSearch(''))
    }, [dispatch, usersList])

    return (
        <div className={'main'}>
            <Header/>
            <Output/>
        </div>
    );
};

export default Main;