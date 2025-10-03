import React, { useState, useEffect } from 'react';
import Learning from './LearningStat.jsx';
import PersonalWorkStat from './PersonalWorkStat.jsx';
import StressStat from './StressStat.jsx';


export default function Stats({ stressPoints = 0, learningStat = 0, setLearningStat, personalWorkStat = 0, setPersonalWorkStat }) {
  const [projectStat, setProjectStat] = useState(0);
  const [stressStat, setStress] = useState(stressPoints);

  // Update stress stat when stressPoints prop changes
  useEffect(() => {
    setStress(stressPoints);
  }, [stressPoints]);

  return (
    <div>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '2px solid #dee2e6',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        //width: '100%',
        //boxSizing: 'border-box'
      }}>
        <Learning learningStat={learningStat} setLearning={setLearningStat} />
        <PersonalWorkStat personalWorkStat={personalWorkStat} setPersonalWork={setPersonalWorkStat} />
        <StressStat stressStat={stressPoints} setStress={setStress} />
      </nav>
      <div style={{ marginTop: '120px' }}>
        {/* Content goes here - this pushes content below the fixed navbar */}
      </div>
    </div>
  );
}