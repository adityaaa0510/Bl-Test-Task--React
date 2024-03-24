import React from 'react'
import './Cardsinfo.css'
import Line from '../../assets/line.jpeg'
import Direction from '../../assets/direction.png'
import Line2 from '../../assets/line2.jpeg'
import Line3 from '../../assets/line3.jpeg'
import RedTop from '../../assets/redtop.jpeg'
import GreenTop from '../../assets/greentop.png'
import { useSelector } from 'react-redux';


const Cardsinfo = () => {
    const casesdata = useSelector((state) => state.counter.casesdata);
    const deathdata = useSelector((state) => state.counter.deathdata);
    const recovereddata = useSelector((state) => state.counter.recovereddata);

    console.log("cases", casesdata)
  return (
    <div className='container cardss'>
        <div className='box'>
            <div className='top'>
                <img className='lines'  src={Line}/>

            </div>
            <div className='bottom'>
                <div className='left'>
                    <h1 className='cases'>{casesdata}</h1>
                    <h2 style={{marginLeft:"-74px"}}>Cases</h2>

                </div>
                <div className='right'>
                    <h3 className='cases'>23%</h3>
                    <img  className="inc-decr" src={Direction}/>
                </div>
            </div>
        </div>



        <div className='box'>
            <div className='top'>
                <img className='lines' src={Line2}/>

            </div>
            <div className='bottom'>
                <div className='left'>
                    <h1 className='cases1'>{deathdata}</h1>
                    <h2 style={{marginLeft:"-74px"}}>Death</h2>

                </div>
                <div className='right'>
                    <h3 className='death'>19%</h3>
                    <img className="inc-decr" src={RedTop}/>
                </div>
            </div>
        </div>


        <div className='box'>
            <div className='top'>
                <img className='lines' src={Line3}/>

            </div>
            <div className='bottom'>
                <div className='left'>
                    <h1 className='recover'>{recovereddata}</h1>
                    <h2 style={{marginLeft:"-40px"}}>Recovered</h2>

                </div>
                <div className='right'>
                    <h3 className='recover'>23%</h3>
                    <img  className="inc-decr" src={GreenTop}/>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Cardsinfo
