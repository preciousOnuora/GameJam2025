function ProjectStat({ projectStat, setProject }) {
    // Define 5 different colors for the grid items
    const colors = [
        '#B80F0A', // Red
        '#FFA500', // Orange
        '#FFFF00', // Yellow
        '#90EE90', // Light Green
        '#228C22'  // Dark Green
    ];
    //const disabled = '#808080';

    // Define thresholds for when each item should be disabled
    // Each item gets disabled when project score reaches a certain level
    const projectScore = projectStat;
    const disableThresholds = [[0, 20], [20, 40], [40, 60], [60, 80], [80, 100]]; // These range from 0 to 100

    // Create the grid items
    const createGridItems = () => {
        const items = [];
        
        for (let i = 0; i < 5; i++) {
            const isDisabled = projectStat < disableThresholds[i][0];
            const isRangeActive = projectStat >= disableThresholds[i][0];
            const itemStyle = {
                backgroundColor: isRangeActive ? colors[i] : '#ddd',
                opacity: isDisabled ? 0.1 : 1,
                // cursor: isDisabled ? 'not-allowed' : 'pointer',
                // border: '2px solid #333',
                // borderRadius: '8px',
                // padding: '10px',
                // margin: '5px',
                // textAlign: 'center',
                minHeight: '25px',
                display: 'flex',
                flexDirection: 'column',
                // justifyContent: 'center',
                // alignItems: 'center',
                transition: 'all 0.1s ease'
            };

            items.push(
                <div
                    key={i}
                    style={itemStyle}
                    // onClick={() => !isDisabled && setProject(projectStat + 1)}
                >
                    {/* <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Level {i + 1}
                    </div> */}
                    {/* <div style={{ fontSize: '12px' }}>
                        {isDisabled ? 'Completed' : 'Click to learn'}
                    </div> */}
                </div>
            );
        }
        
        return items;
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
            <h3 style={{ 
                fontSize: '16px', 
                fontFamily: 'Arial, sans-serif',
                margin: '0 10px 0 0',
                whiteSpace: 'nowrap'
            }}>
                Group Project: {projectStat}
            </h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                width: '150px'
            }}>
                {createGridItems()}
            </div>
        </div>
    );
}

export default ProjectStat;