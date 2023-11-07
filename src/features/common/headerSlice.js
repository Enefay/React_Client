import { createSlice } from '@reduxjs/toolkit'

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        pageTitle: "Anasayfa",  // current page title state management
        noOfNotifications : 3,  // Okunmamış Bildirim Sayısı
        newNotificationMessage : "",  // Gösterilecek bildirim mesajı
        newNotificationStatus : 1,   // bildirim türünü kontrol etmek için - success/ error/ info
    },
    reducers: {
        setPageTitle: (state, action) => {
            state.pageTitle = action.payload.title
        },


        removeNotificationMessage: (state, action) => {
            state.newNotificationMessage = ""
        },

        showNotification: (state, action) => {
            state.newNotificationMessage = action.payload.message
            state.newNotificationStatus = action.payload.status
        },
    }
})

export const { setPageTitle, removeNotificationMessage, showNotification } = headerSlice.actions

export default headerSlice.reducer