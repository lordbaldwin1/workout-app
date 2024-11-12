import React, { useState } from 'react';
import ExerciseTable from './ExerciseTable';

const WorkoutLog = () => {
    const [exercises, setExercises] = useState([]);
    const [exerciseName, setExerciseName] = useState('');

    const addExercise = () => {
        if (exerciseName) {
            // Add a new exercise with an empty array of sets
            setExercises([...exercises, { name: exerciseName, sets: [{ weight: '', reps: '' }] }]);
            setExerciseName('');
        }
    };

    const updateSet = (exerciseIndex, setIndex, updatedFields) => {
        // Update a specific set within an exercise
        setExercises((prevExercises) =>
            prevExercises.map((exercise, i) =>
                i === exerciseIndex
                    ? {
                          ...exercise,
                          sets: exercise.sets.map((set, j) =>
                              j === setIndex ? { ...set, ...updatedFields } : set
                          ),
                      }
                    : exercise
            )
        );
    };

    const addSet = (exerciseIndex) => {
        // Add a new empty set to a specific exercise
        setExercises((prevExercises) =>
            prevExercises.map((exercise, i) =>
                i === exerciseIndex
                    ? {
                          ...exercise,
                          sets: [...exercise.sets, { weight: '', reps: '' }],
                      }
                    : exercise
            )
        );
    };

    return (
        <div>
            <h2>Workout Log</h2>
            <input
                type="text"
                placeholder="Exercise Name"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
            />
            <button onClick={addExercise}>Add Exercise</button>

            <div>
                {exercises.map((exercise, index) => (
                    <ExerciseTable
                        key={index}
                        exercise={exercise}
                        exerciseIndex={index}
                        updateSet={updateSet}
                        addSet={addSet}
                    />
                ))}
            </div>
        </div>
    );
};

export default WorkoutLog;
