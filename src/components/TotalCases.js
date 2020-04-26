import React from 'react';

function TotalCases(props){
  return(
    <div className={props.className} onAnimationEnd={() => props.onAnimationEnd()}>
    <div className='mb-2'>
      <div className='individual-box-total'>
      <div className='confirmed-title'>Confirmed</div>
      <div className='confirmed-text'>{props.totalCases}</div>
      <div className='confirmed-text-sm'>[+{props.deltaCases}]</div>
      </div>
      <div className='individual-box-total'>
      <div className='active-title'>Active</div>
      <div className='active-text'>{props.totalActive}</div>
      <div className='active-text-sm'>[NA]</div>
      </div>
      <div className='individual-box-total'>
      <div className='recovered-title'>Recovered</div>
      <div className='recovered-text'>{props.totalRecovered}</div>
      <div className='recovered-text-sm'>[+{props.deltaRecovered}]</div>
      </div>
      <div className='individual-box-total'>
      <div className='deaths-title'>Deaths</div>
      <div className='deaths-text'>{props.totalDeath}</div>
      <div className='deaths-text-sm'>[+{props.deltaDeaths}]</div>
      </div>
    </div>
    </div>
  );
}

export default TotalCases;