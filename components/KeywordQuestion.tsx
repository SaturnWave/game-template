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
    const [scrambledKeyword, setScrambledKeyword] = useState('');
    const [originalScrambledKeyword, setOriginalScrambledKeyword] = useState('');
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const scrambled = scrambleWord(keyword);
        setScrambledKeyword(scrambled);
        setOriginalScrambledKeyword(scrambled);
        setUserAnswer(''); // Clear user answer on new keyword
    }, [keyword]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newInput = e.target.value;
        const lastChar = newInput.slice(-1).toLowerCase();

        if (newInput.length < userAnswer.length) {
            // Character was deleted
            const deletedChar = userAnswer.slice(-1).toLowerCase();
            setScrambledKeyword((prev) => {
                const originalIndex = originalScrambledKeyword.toLowerCase().indexOf(deletedChar);
                return prev.slice(0, originalIndex) + deletedChar + prev.slice(originalIndex);
            });
        } else if (scrambledKeyword.toLowerCase().includes(lastChar)) {
            // Character was added
            setScrambledKeyword((prev) => {
                const index = prev.toLowerCase().indexOf(lastChar);
                return prev.slice(0, index) + prev.slice(index + 1);
            });
        } else {
            setFeedback('Incorrect character!');
            setTimeout(() => setFeedback(''), 1000);
        }

        setUserAnswer(newInput);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            setFeedback('Correct!');
            setTimeout(() => {
                setFeedback('');
                setUserAnswer('');
                onNext();
            }, 1000);
        } else {
            setFeedback('Incorrect!');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <div>
            <h3>{question}</h3>
            <p>Scrambled Word: {scrambledKeyword}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" value={userAnswer} onChange={handleInputChange} />
                <button type="submit">Submit</button>
            </form>
            <p>{feedback}</p>
        </div>
    );
};

export default KeywordQuestion;
