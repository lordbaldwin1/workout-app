import { useState, useEffect } from 'react';
import '../App.css'

const InputExercise = ({ exercise, rir, setExercise, setRir }) => {
    return (
        <div className='exercise-input'>
            <input
                type='text'
                placeholder='Exercise'
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
            />
            <input
                type='text'
                placeholder='RIR'
                value={rir}
                onChange={(e) => setRir(e.target.value)}
            />
        </div>
    );
};

const LogRows = ({ log, updateLog }) => {
    const handleWeightChange = (index, value) => {
        updateLog(index, { weight: value });
    };
    const handleRepsChange = (index, value) => {
        updateLog(index, { reps: value });
    };

    return (
        <div className='exercise-row'>
            <table>
                <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>RIR</th>
                        <th>Weight</th>
                        <th>Reps</th>
                    </tr>
                </thead>
                <tbody>
                    {log.map((row, index) => (
                        <tr key={index}>
                            <td>{row.exercise}</td>
                            <td>{row.rir}</td>
                            <td>
                                <input
                                    type='number'
                                    placeholder='lbs.'
                                    value={row.weight || ''}
                                    onChange={(e) => handleWeightChange(index, e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type='number'
                                    placeholder='reps'
                                    value={row.reps || ''}
                                    onChange={(e) => handleRepsChange(index, e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const WorkoutLog = () => {
    const [log, setLog] = useState([]);
    const [exercise, setExercise] = useState('');
    const [rir, setRir] = useState('');
    const [showInput, setShowInput] = useState(false);

    const handleAdd = () => {
        if(exercise && rir) {
            setLog([...log, { exercise, rir, weight: '', reps: ''}]);
            setExercise('');
            setRir('');
            setShowInput(false);
        }
    };

    const updateLog = (index, updatedFields) => {
        setLog((prevLog) =>
            prevLog.map((entry, i) =>
                i === index ? { ...entry, ...updatedFields } : entry
            )
        );
    };
    
    return (
        <div>
            {showInput ? (
                <>
                <InputExercise exercise={exercise} rir={rir} setExercise={setExercise} setRir={setRir} />
                <button onClick={handleAdd}>Add Exercise</button>
                </>
            ) : (
            <button onClick={() => setShowInput(true)}>New Exercise</button>
            )}
            <div>
                <LogRows log={log} updateLog={updateLog} />
            </div>
        </div>
    );
};

export default WorkoutLog;