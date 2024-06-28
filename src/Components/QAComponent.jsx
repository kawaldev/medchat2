import React, { useState } from 'react';

const QAComponent = ({ questions }) => {
    const [answers, setAnswers] = useState({});

    // Handle input change for all types of questions
    const handleChange = (questionId, value, isMultiple) => {
        if (isMultiple) {
            // For checkboxes, handle multiple selections
            setAnswers({
                ...answers,
                [questionId]: {
                    ...answers[questionId],
                    [value]: !(answers[questionId] && answers[questionId][value])
                }
            });
        } else {
            // For radio and text inputs
            setAnswers({
                ...answers,
                [questionId]: value
            });
        }
    };

    // Render question based on type
    const renderQuestion = (question) => {
        switch (question.type) {
            case 'single':
                return (
                    <div>
                        <h3>{question.text}</h3>
                        {question.options.map(option => (
                            <label key={option}>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value={option}
                                    checked={answers[question.id] === option}
                                    onChange={() => handleChange(question.id, option, false)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                );
            case 'multiple':
                return (
                    <div>
                        <h3>{question.text}</h3>
                        {question.options.map(option => (
                            <label key={option}>
                                <input
                                    type="checkbox"
                                    name={question.id}
                                    value={option}
                                    checked={answers[question.id] && answers[question.id][option]}
                                    onChange={() => handleChange(question.id, option, true)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                );
            case 'text':
                return (
                    <div>
                        <h3>{question.text}</h3>
                        <input
                            type="text"
                            value={answers[question.id] || ''}
                            onChange={(e) => handleChange(question.id, e.target.value, false)}
                        />
                    </div>
                );
            default:
                return <p>Invalid question type</p>;
        }
    };

    return (
        <div>
            {questions.map(question => (
                <div key={question.id} className="question">
                    {renderQuestion(question)}
                </div>
            ))}
        </div>
    );
};

export default QAComponent;
