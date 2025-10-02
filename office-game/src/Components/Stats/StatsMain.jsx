import React, { useState } from 'react';
import Learning from './LearningStat.jsx';
import PersonalWork from './PersonalWorkStat.jsx';
import Project from './ProjectStat.jsx';
import StressStat from './StressStat.jsx';


export default function Stats() {
  const [learningStat, setLearning] = useState(0);
  const [personalWorkStat, setPersonalWork] = useState(0);
  const [projectStat, setProjectStat] = useState(0);
  const [stressStat, setStress] = useState(0);

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
        <Learning learningStat={learningStat} setLearning={setLearning} />
        <PersonalWork personalWorkStat={personalWorkStat} setPersonalWork={setPersonalWork} />
        <Project projectStat={projectStat} setProject={setProjectStat} />
        <StressStat stressStat={stressStat} setStress={setStress} />
      </nav>
      <div style={{ marginTop: '120px' }}>
        {/* Content goes here - this pushes content below the fixed navbar */}
      </div>
    </div>
  );
}