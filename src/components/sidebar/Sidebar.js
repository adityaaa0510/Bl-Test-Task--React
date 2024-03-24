import React from 'react'
import comment from '../../assets/comment.png'
import hands from '../../assets/hands.png'
import hygiene from '../../assets/hygiene.png'
import hygiene1 from '../../assets/hygiene1.png'
import settings from '../../assets/settings.png'
import windows from '../../assets/windows.png'
import virus from '../../assets/virus.png'



import './Sidebar.css'

function Sidebar() {
    return (
        <div className='sidebar-main'>
            <div>
                <img style={{marginTop:"20px"}} className='size-img' src={virus}></img>
            </div>
            <div className="explore">
     
                <div className='home'>
                    <img style={{marginTop:"20px"}} className='size-img' src={windows}></img>
                </div>
       
                <div>
                    <img className='size-img' src={hygiene1}></img>
                </div>
 
                <div>
                    <img className='size-img' src={hygiene}></img>
                </div>
   
                <div>
                    <img className='size-img' src={hands}></img>
                </div>
        
                <div>
                    <img className='size-img' src={comment}></img>
                </div>
            </div>
            <div>
                <img className='size-img' style={{marginBottom:"20px"}}src={settings}></img>
            </div>
        </div>
    )
}

export default Sidebar