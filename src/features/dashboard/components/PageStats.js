import HeartIcon from '@heroicons/react/24/outline/HeartIcon'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'



function PageStats({ }) {
  return (
    <div className="stats bg-base-100 shadow">

      <div className="stat">
        <div className="stat-figure invisible md:visible">
          <HeartIcon className='w-8 h-8' />
        </div>
        <div className="stat-title">Onaylanan Talepler</div>
        <div className="stat-value">1</div>
        <div className="stat-actions">
          <button className="btn btn-xs">Görüntüle</button>
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure invisible md:visible">
          <TrashIcon className='w-8 h-8' />
        </div>
        <div className="stat-title">Reddedilen Talepler</div>
        <div className="stat-value">1</div>
        <div className="stat-actions">
          <button className="btn btn-xs">Görüntüle</button>
        </div>
      </div>
    </div>
  )
}

export default PageStats