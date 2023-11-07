import { createSlice } from '@reduxjs/toolkit'

export const rightDrawerSlice = createSlice({
    name: 'rightDrawer',
    initialState: {
        header: "",  // mevcut unvan durumu yönetimi
        isOpen : false,   // Açma kapama için sağ çekmece durumu yönetimi
        bodyType : "",   // sağ çekmece içerik yönetimi
        extraObject : {},   
    },
    reducers: {

        openRightDrawer: (state, action) => {
            const {header, bodyType, extraObject} = action.payload
            state.isOpen = true
            state.bodyType = bodyType
            state.header = header
            state.extraObject = extraObject
        },

        closeRightDrawer: (state, action) => {
            state.isOpen = false
            state.bodyType = ""
            state.header = ""
            state.extraObject = {}
        },

    }
})

export const { openRightDrawer, closeRightDrawer } = rightDrawerSlice.actions

export default rightDrawerSlice.reducer