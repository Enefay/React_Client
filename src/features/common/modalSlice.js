import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        title: "",  // mevcut unvan durumu yönetimi
        isOpen : false,   // açılış kapanışı için modal durum yönetimi
        bodyType : "",   // modal içerik yönetimi
        size : "",   // modal içerik yönetimi
        extraObject : {},   
    },
    reducers: {

        openModal: (state, action) => {
            const {title, bodyType, extraObject, size} = action.payload
            state.isOpen = true
            state.bodyType = bodyType
            state.title = title
            state.size = size || 'md'
            state.extraObject = extraObject
        },

        closeModal: (state, action) => {
            state.isOpen = false
            state.bodyType = ""
            state.title = ""
            state.extraObject = {}
        },

    }
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer