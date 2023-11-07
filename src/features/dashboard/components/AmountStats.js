import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon'
import ReceiptRefundIcon from '@heroicons/react/24/outline/ReceiptRefundIcon'



function AmountStats({ }) {
    return (
        <div className="stats bg-base-100 shadow">
            <div className="stat">
                <div className="stat-figure invisible md:visible">
                    <BookmarkIcon className='w-8 h-8' />
                </div>
                <div className="stat-title">Taslaktaki Talepler</div>
                <div className="stat-value">1 </div>
                <div className="stat-actions">
                    <button className="btn btn-xs">Görüntüle</button>
                </div>
            </div>

            <div className="stat">
                <div className="stat-figure invisible md:visible">
                    <ReceiptRefundIcon className='w-8 h-8' />
                </div>
                <div className="stat-title">Onay Bekleyen Talepler</div>
                <div className="stat-value">3</div>
                <div className="stat-actions">
                    <button className="btn btn-xs">Görüntüle</button>
                </div>
            </div>
        </div>
    )
}

export default AmountStats