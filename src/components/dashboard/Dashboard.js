import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../navbar/Navbar'
import Liveupdate from '../liveupdate/Liveupdate'
import Cardsinfo from '../cardsinfo/Cardsinfo'
import './Dashboard.css'
import Chartbar from '../chartbar/Chartbar'
import Pichart from '../pichart/Pichart'

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className='accumulate'>
     
          <Cardsinfo />

        <div>
          <Liveupdate />
        </div>

      </div>
      <Chartbar/>
      <Pichart/>
    </div>
  )
}

export default Dashboard