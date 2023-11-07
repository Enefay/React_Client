import PageContent from "./PageContent"
import LeftSidebar from "./LeftSidebar"
import { useSelector, useDispatch } from 'react-redux'
import RightSidebar from './RightSidebar'
import { useEffect } from "react"
import  {  removeNotificationMessage } from "../features/common/headerSlice"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ModalLayout from "./ModalLayout"

function Layout(){
  const dispatch = useDispatch()
  const {newNotificationMessage, newNotificationStatus} = useSelector(state => state.header)


  useEffect(() => {
      if(newNotificationMessage !== ""){
          if(newNotificationStatus === 1)NotificationManager.success(newNotificationMessage, 'Başarılı')
          if(newNotificationStatus === 0)NotificationManager.error( newNotificationMessage, 'Hata')
          dispatch(removeNotificationMessage())
      }
  }, [newNotificationMessage])

    return(
      <>
        { /* Sidebar - sayfa içeriğini ve kenar çubuğunu içerir (her zaman açık)*/ }
        <div className="drawer drawer-mobile">
            <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
            <PageContent/>
            <LeftSidebar />
        </div>

        { /* Sağ sidebar - bildirim listesi vb. gibi ikincil içerikleri içerir. */ }
        <RightSidebar />


        {/** Notification layout container */}
        <NotificationContainer />

      {/* Modal layout container */}
        <ModalLayout />

      </>
    )
}

export default Layout