import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import LeadsDetail from '../../features/leadsdetail'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Talep Detayı"}))
      }, [])


    return(
        <>
         <LeadsDetail />  
        </>
        
    )
}

export default InternalPage