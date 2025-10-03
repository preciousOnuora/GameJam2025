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
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '20px',
      transform: 'translateY(-50%)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
      alignItems: 'flex-start',
      padding: '0'
    }}>
      <Learning learningStat={learningStat} setLearning={setLearningStat} />
      <PersonalWorkStat personalWorkStat={personalWorkStat} setPersonalWork={setPersonalWorkStat} />
      <StressStat stressStat={stressPoints} setStress={setStress} />
    </div>
  );
}