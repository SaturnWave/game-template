// pages/index.tsx
import React from 'react';
import SubjectSelection from '../components/SubjectSelection';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Keyword Quiz Challenge</h1>
            <SubjectSelection />
        </div>
    );
};

export default Home;
