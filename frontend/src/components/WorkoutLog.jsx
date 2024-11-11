import { useState } from 'react';
import '../App.css';

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

const LogRows = ({ log, updateLog, exerciseIndex }) => {
    const handleWeightChange = (setIndex, value) => {
        updateLog(exerciseIndex, setIndex, { weight: value });
    };
    const handleRepsChange = (setIndex, value) => {
        updateLog(exerciseIndex, setIndex, { reps: value });
    };

    return (
        <div className='exercise-row'>
            <h3>{log.exercise}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Set</th>
                        <th>RIR</th>
                        <th>Weight</th>
                        <th>Reps</th>
                    </tr>
                </thead>
                <tbody>
                    {log.sets.map((row, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{log.rir}</td>
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
        if (exercise && rir) {
            setLog([...log, { exercise, rir, sets: [{ weight: '', reps: '' }] }]);
            setExercise('');
            setRir('');
            setShowInput(false);
        }
    };

    const updateLog = (exerciseIndex, setIndex, updatedFields) => {
        setLog((prevLog) =>
            prevLog.map((entry, i) =>
                i === exerciseIndex
                    ? {
                          ...entry,
                          sets: entry.sets.map((set, j) =>
                              j === setIndex ? { ...set, ...updatedFields } : set
                          ),
                      }
                    : entry
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
                {log.map((entry, index) => (
                    <LogRows key={index} log={entry} updateLog={updateLog} exerciseIndex={index} />
                ))}
            </div>
        </div>
    );
};

export default WorkoutLog;
