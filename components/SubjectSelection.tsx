// components/SubjectSelection.tsx
import React from 'react';
import { useRouter } from 'next/router';

const subjects = ['Solar System', 'Newtonian Mechanics', 'Biology', 'History'];

const SubjectSelection: React.FC = () => {
    const router = useRouter();

    const handleSelect = (subject: string) => {
        router.push(`/game?subject=${subject}`);
    };

    return (
        <div>
            <h2>Select a Subject</h2>
            {subjects.map(subject => (
                <button key={subject} onClick={() => handleSelect(subject)}>{subject}</button>
            ))}
        </div>
    );
};

export default SubjectSelection;
