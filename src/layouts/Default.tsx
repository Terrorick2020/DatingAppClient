import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { initProfileAsync } from '@/store/slices/profileSlice'
import { TDispatch } from '@/store'

import DesctopHeadNav from '@/components/Layouts/DesctopHeadNav'
import LogoHeader from '@/components/Layouts/LogoHeader'


const DefaultLayout = () => {
    const [ result, setResult ] = useState<boolean | null>(null)

    const dispatch = useDispatch<TDispatch>()

    useEffect(() => {
    const fetchProfile = async () => {
        const action = await dispatch(initProfileAsync(window.location.href))
        // setResult(action.payload as boolean | null)
        setResult(true)
    }

    fetchProfile()
    }, [])

    return (
        result && (
            <>  
                <div className="default-layout">
                    <div className="box">
                        <DesctopHeadNav />
                        <LogoHeader />
                        <Outlet />
                    </div>
                </div>
            </>
        )
    )
}

export default DefaultLayout