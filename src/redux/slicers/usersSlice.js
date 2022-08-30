import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {URL, regexEmail, regexPhone} from "../../config";

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await fetch(URL)
        const data = await res.json()
        dispatch(getUsersReducer(data))
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersList: [],
        sortUserList: [],
        searchResults: [],
    },
    reducers: {
        handleSearch(state, action) {
            state.searchResults = []
            const arr = state.usersList.sort((a, b) => {
                const nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
                if (nameA < nameB)
                    return -1
                if (nameA > nameB)
                    return 1
                return 0
            })
            if (action.payload.length > 0) {
                state.searchResults = arr.map((el) => {
                    return el.name.toLowerCase().includes(action.payload.toLowerCase()) ? el : null
                }).filter(el => el !== null)
            }
        },
        getUsersReducer(state, action) {
            state.usersList = action.payload.map((el) => {
                ['address', 'company', 'username', 'website'].forEach((key) => delete el[key])
                return el
            })
        },
        addContactReducer(state) {
            const contact = {
                name: prompt('введите имя'),
                phone: prompt(' введите номер телефона'),
                email: prompt('введите email'),
                id: new Date().toISOString(),
            }
            if (contact.name && contact.email.match(regexEmail) && contact.phone.match(regexPhone)) {
                state.usersList.push(contact)
            } else if (!contact.phone.match(regexPhone) && !contact.email.match(regexEmail)){
                alert("вы неправильно ввели номер телефона и почту")
            } else if (!contact.phone.match(regexPhone)){
                alert("вы неправильно ввели номер телефона")
            } else if (!contact.email.match(regexEmail)){
                alert("вы неправильно ввели почту")
            }
        },
        editContactReducer(state, action) {
            const idUser = state.usersList.find(el => el.id === action.payload)
            let newName = prompt('name')
            let newPhone = prompt('phone')
            let newEmail = prompt('email')

            newName && (idUser.name = newName)
            newPhone && (newPhone.match(regexPhone)?idUser.phone = newPhone:alert('вы ввели неверный номер'))
            newEmail && (newEmail.match(regexEmail)?idUser.phone = newEmail:alert('вы ввели неверную почту'))
        },
        deleteContactReducer(state, action) {
            state.usersList = state.usersList.filter(el => el.id !== action.payload)
        },
        sortReducer(state) {
            let arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                't', 'u', 'v', 'w', 'x', 'y', 'z', '#'];
            let arr = []
            arr_en.forEach((el) => {
                let letterObj = {
                    letter: el,
                    list: [],
                }
                state.usersList.forEach((item) => {
                    if (item.name[0].toLowerCase() === el) {
                        letterObj.list.push(item)
                    } else if (el === "#" && item.name[0].match(/\d/)) {
                        letterObj.list.push(item)
                    }
                })
                arr.push(letterObj)
            })
            // console.log(arr)
            state.sortUserList = arr
        },
    }
})

export const {
    getUsersReducer,
    addContactReducer,
    editContactReducer,
    deleteContactReducer,
    sortReducer,
    handleSearch,
} = usersSlice.actions
export default usersSlice.reducer