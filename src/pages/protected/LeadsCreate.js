import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import LeadsCreate from '../../features/leadscreate'



function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Talep Oluştur"}))
      }, [])


    return(
        <>
         <LeadsCreate />  
        </>
        
    )
}

export default InternalPage