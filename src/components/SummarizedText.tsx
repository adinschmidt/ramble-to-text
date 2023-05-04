import React from 'react';

interface SummarizedTextProps {
  text: string;
}

const SummarizedText: React.FC<SummarizedTextProps> = ({ text }) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text).then(
      () => alert('Text copied to clipboard!'),
      (err) => console.error('Failed to copy text: ', err)
    );
  };

  return (
    <div>
      <h2>Summarized Text</h2>
      <p>{text}</p>
      {text && (
        <button onClick={handleCopyToClipboard}>Copy to clipboard</button>
      )}
    </div>
  );
};

export default SummarizedText;
