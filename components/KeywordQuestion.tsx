import React, { useState, useEffect } from 'react';

interface KeywordQuestionProps {
    keyword: string;
    question: string;
    correctAnswer: string;
    onNext: () => void;
}

const scrambleWord = (word: string): string => {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
};

const KeywordQuestion: React.FC<KeywordQuestionProps> = ({ keyword, question, correctAnswer, onNext }) => {
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [scrambledWord, setScrambledWord] = useState('');

    useEffect(() => {
        setScrambledWord(scrambleWord(keyword));
        setUserAnswer(''); // Clear user answer on new keyword
    }, [keyword]);

    const handleSubmit = () => {
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            setFeedback('Correct!');
            setTimeout(() => {
                setFeedback('');
                setUserAnswer('');
                onNext();
            }, 1000);
        } else {
            setFeedback('Incorrect. Try again.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newInput = e.target.value;
        const lastChar = newInput.slice(-1).toLowerCase();

        if (scrambledWord.toLowerCase().includes(lastChar)) {
            setScrambledWord((prev) => {
                const index = prev.toLowerCase().indexOf(lastChar);
                return prev.slice(0, index) + prev.slice(index + 1);
            });
            setUserAnswer(newInput);
        } else {
            setFeedback('Incorrect character!');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <div>
            <p>{question}</p>
            <p>Scrambled word: {scrambledWord}</p>
            <input
                type="text"
                value={userAnswer}
                onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>Submit</button>
            <p>{feedback}</p>
        </div>
    );
};

export default KeywordQuestion;
