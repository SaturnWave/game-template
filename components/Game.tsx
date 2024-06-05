import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import KeywordQuestion from './KeywordQuestion';

const generateKeywords = (subject: string): { keyword: string, question: string, answer: string }[] => {
    if (subject === 'Solar System') {
        return [
            { keyword: 'Jupiter', question: 'I am a Gas Giant and the biggest Planet in the Solar System. Who am I?', answer: 'Jupiter' },
            { keyword: 'Mars', question: 'I am known as the Red Planet. Who am I?', answer: 'Mars' },
            { keyword: 'Saturn', question: 'I have a prominent ring system. Who am I?', answer: 'Saturn' }
        ];
    }
    return [];
};

const Game: React.FC = () => {
    const router = useRouter();
    const { subject } = router.query;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [keywords, setKeywords] = useState<{ keyword: string, question: string, answer: string }[]>([]);
    const [usedKeywords, setUsedKeywords] = useState(new Set<number>());

    useEffect(() => {
        if (subject) {
            const generatedKeywords = generateKeywords(subject as string);
            setKeywords(generatedKeywords);
        }
    }, [subject]);

    const handleNextQuestion = () => {
        setUsedKeywords(new Set(usedKeywords).add(currentQuestionIndex));
        const nextIndex = keywords.findIndex((_, index) => !usedKeywords.has(index));
        if (nextIndex !== -1) {
            setCurrentQuestionIndex(nextIndex);
        } else {
            setCurrentQuestionIndex(keywords.length);
        }
    };

    if (currentQuestionIndex >= keywords.length) {
        return <div><h2>Congratulations! You've completed the quiz on {subject}!</h2></div>;
    }

    const currentKeyword = keywords[currentQuestionIndex];

    return (
        <div>
            <h2>Subject: {subject}</h2>
            <KeywordQuestion
                keyword={currentKeyword.keyword}
                question={currentKeyword.question}
                correctAnswer={currentKeyword.answer}
                onNext={handleNextQuestion}
            />
        </div>
    );
};

export default Game;
