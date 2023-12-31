import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'

import DocumentIcon  from '@heroicons/react/24/solid/DocumentIcon'
import Deneme from '../../features/deneme'

function InternalPage(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Page Title"}))
      }, [])
      
    return(
        <Deneme />

    )
}

export default InternalPage