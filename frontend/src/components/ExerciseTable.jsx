import React from 'react';

const ExerciseTable = ({ exercise, exerciseIndex, updateSet, addSet }) => {
    const handleWeightChange = (setIndex, value) => {
        updateSet(exerciseIndex, setIndex, { weight: value });
    };

    const handleRepsChange = (setIndex, value) => {
        updateSet(exerciseIndex, setIndex, { reps: value });
    };

    return (
        <div className="exercise-table">
            <h3>{exercise.name}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Set</th>
                        <th>Weight</th>
                        <th>Reps</th>
                    </tr>
                </thead>
                <tbody>
                    {exercise.sets.map((set, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <input
                                    type="number"
                                    placeholder="Weight"
                                    value={set.weight}
                                    onChange={(e) => handleWeightChange(index, e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    placeholder="Reps"
                                    value={set.reps}
                                    onChange={(e) => handleRepsChange(index, e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => addSet(exerciseIndex)}>Add Set</button>
        </div>
    );
};

export default ExerciseTable;
