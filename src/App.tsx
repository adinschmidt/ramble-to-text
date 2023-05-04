import React, { useState } from 'react';
import RecordButton from './components/RecordButton';
import SummarizedText from './components/SummarizedText';

function App() {
  const [summarizedText, setSummarizedText] = useState('');

  return (
    <div>
      <h1>Ramble to Text</h1>
      <RecordButton onSummarized={(summary: string) => setSummarizedText(summary)} />
      <SummarizedText text={summarizedText} />
    </div>
  );
}

export default App;
