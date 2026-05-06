import { useState, useEffect, useCallback } from 'react';
import { S } from './components/light';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [phase, setPhase] = useState('loading');

  const fetchQuestions = useCallback(() => {
    setPhase('loading');
    setAnswers({});
    setCurrent(0);
    fetch(`${API_URL}/api/questions/random`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        if (!data || !data.length) { setPhase('error'); return; }
        setQuestions(data);
        setPhase('quiz');
      })
      .catch((err) => {
        console.error("Quiz Fetch Error:", err);
        setPhase('error');
      });
  }, []);

  useEffect(() => { 
    fetchQuestions(); 
  }, [fetchQuestions]);

  const handleNext = () => {
    if (current === questions.length - 1) { 
      setPhase('results'); 
    } else {
      setCurrent(c => c + 1);
    }
  };

  const getOptions = (q) => [q.option1, q.option2, q.option3, q.option4].filter(Boolean);
  
  const score = questions.filter((q, i) => answers[i] === q.answer).length;

  /* --- LOADING STATE --- */
  if (phase === 'loading') return (
    <div style={S.center}>
      <div style={{ marginBottom: '16px' }}>
        {[0, 1, 2].map(i => <span key={i} style={{ ...S.dot, animationDelay: `${i * 0.2}s` }} />)}
      </div>
      <p style={S.statusText}>Initialising Data Stream</p>
    </div>
  );

  /* --- ERROR STATE --- */
  if (phase === 'error') return (
    <div style={S.card}>
      <div style={S.accent} />
      <p style={S.errorText}>Connection Failure</p>
      <p style={S.subText}>The question bank is unreachable. Ensure the backend server is active.</p>
      <button style={S.retryBtn} onClick={fetchQuestions}>Retry Connection</button>
    </div>
  );

  /* --- RESULTS PHASE --- */
  if (phase === 'results') return (
    <div style={S.card}>
      <div style={S.accent} />
      <div style={S.label}>
        <span>OSI Quiz Results</span>
        <span style={{ color: '#64748b' }}>{score}/{questions.length} Correct</span>
      </div>
      <div style={S.scoreWrap}>
        <div style={S.scoreBig}>{questions.length > 0 ? Math.round((score / questions.length) * 100) : 0}%</div>
        <div style={S.scoreLabel}>
          {score === questions.length ? 'System Optimised' : 'Review Required'}
        </div>
      </div>
      {questions.map((q, i) => {
        const userAns = answers[i];
        const isCorrect = userAns === q.answer;
        return (
          <div key={q.id || i} style={S.reviewItem(isCorrect)}>
            <div style={S.reviewQ}>{q.question}</div>
            <div style={S.reviewAnswer(isCorrect)}>
              {isCorrect ? '✓' : '✗'} Your answer: {userAns || 'Skipped'}
            </div>
            {!isCorrect && <div style={S.reviewCorrect}>Correct: {q.answer}</div>}
          </div>
        );
      })}
      <button style={S.retryBtn} onClick={fetchQuestions}>Restart Session</button>
    </div>
  );

  /* --- QUIZ PHASE --- */
  const q = questions[current];
  const selected = answers[current];

  return (
    <div style={S.card}>
      <div style={S.accent} />
      <div style={S.label}>
        <span>OSI Simulation Quiz</span>
        <span style={{ color: '#64748b' }}>{current + 1} / {questions.length}</span>
      </div>
      <div style={S.progress}>
        <div style={S.progressFill(((current + 1) / questions.length) * 100)} />
      </div>
      <div style={S.question}>{q.question}</div>
      {getOptions(q).map((opt, i) => (
        <button
          key={i}
          style={S.optionBtn(selected === opt)}
          onClick={() => setAnswers({ ...answers, [current]: opt })}
        >
          <span style={{ color: '#64748b', marginRight: '12px', fontWeight: '600' }}>{String.fromCharCode(65 + i)}.</span>
          {opt}
        </button>
      ))}
      <button
        style={S.nextBtn(!selected)}
        disabled={!selected}
        onClick={handleNext}
      >
        {current === questions.length - 1 ? 'Submit →' : 'Next Node →'}
      </button>
    </div>
  );
};

export default Quiz;