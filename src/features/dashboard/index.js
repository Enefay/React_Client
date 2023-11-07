import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'


function Dashboard(){


    return(
        <>
          
        {/** ---------------------- Different stats content 2 ------------------------- */}
        
            <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats />
                <PageStats />
            </div>
        </>
    )
}

export default Dashboard