import React, { useState } from 'react';
import transcribeAudio from '../transcribeAudio';
import summarizeText from '../summarizeText';

interface RecordButtonProps {
  onSummarized: (summary: string) => void;
}

const RecordButton: React.FC<RecordButtonProps> = ({ onSummarized }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      const url = URL.createObjectURL(event.data);
      setAudioURL(url);
    }
  };

  const handleStop = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleRecord = async () => {
    if (!isRecording) {
      setIsRecording(true);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mimeType = 'audio/webm;codecs=opus';

        if (!MediaRecorder.isTypeSupported(mimeType)) {
            console.error('OPUS codec in webm container is not supported on this browser.');
            return;
        }

        const recorder = new MediaRecorder(stream, { mimeType });
        setMediaRecorder(recorder);

        recorder.addEventListener('dataavailable', handleDataAvailable);
        recorder.addEventListener('stop', handleStop);

        recorder.start();

        setTimeout(() => {
          handleStop();
        }, 3000);
      } catch (err) {
        console.error('Error accessing the microphone:', err);
        setIsRecording(false);
      }
    } else {
      handleStop();
    }
  };

  const handleSubmit = async () => {
    if (audioURL) {
      try {
        const response = await fetch(audioURL);
        const audioBlob = await response.blob();
        const transcribedText = await transcribeAudio(audioBlob);
        console.log(transcribedText)
        const summary = await summarizeText(transcribedText);
        onSummarized(summary);
      } catch (error) {
        console.error('Error fetching the audio Blob or transcribing:', error);
      }
    }
  };

  return (
    <div>
      <button onClick={handleRecord}>
        {isRecording ? 'Stop Recording' : 'Record'}
      </button>
      {audioURL && (
        <>
          <audio controls src={audioURL} style={{ marginLeft: '10px' }}>
            Your browser does not support the audio element.
          </audio>
          <button onClick={handleSubmit} style={{ marginLeft: '10px' }}>
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default RecordButton;
