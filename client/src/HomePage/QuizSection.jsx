import { useState } from 'react';
import Quiz from './Quiz'; 
import DragDropQuiz from './DragDropQuiz';
import { S } from './components/light';

const QuizSection = () => {
  const [activeTab, setActiveTab] = useState('multi');

  return (
    <section style={S.quizSection}>
      <div style={S.quizContainer}>
        
        {/* Toggle Header */}
        <div style={S.quizHeader}>
          <h2 style={S.quizTitle}>
            Test Your <span style={S.quizTitleGradient}>Knowledge</span>
          </h2>
          
          <div style={S.quizToggleWrapper}>
            <button 
              onClick={() => setActiveTab('multi')}
              style={activeTab === 'multi' ? S.activeToggle : S.inactiveToggle}
            >
              Multiple Choice
            </button>
            <button 
              onClick={() => setActiveTab('drag')}
              style={activeTab === 'drag' ? S.activeToggle : S.inactiveToggle}
            >
              Drag & Drop
            </button>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div>
          {activeTab === 'multi' ? <Quiz /> : <DragDropQuiz />}
        </div>

      </div>
    </section>
  );
};

export default QuizSection;