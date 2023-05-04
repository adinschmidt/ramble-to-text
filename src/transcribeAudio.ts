import axios from 'axios';

const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
    const key = process.env.OPENAI_API_KEY;
  const data = new FormData();
  data.append('file', audioBlob, 'audio.webm');
  data.append('model', 'whisper-1');
  data.append('response_format', 'text');

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.openai.com/v1/audio/transcriptions',
    headers: {
      'Authorization': 'Bearer ' + key,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    // Extract transcribed text from the response
    const transcribedText = response.data;

    // Parse and process the transcribed text as needed
    // For now, we return the raw response data
    return transcribedText;
  } catch (error) {
    console.log(error);
    return '';
  }
};

export default transcribeAudio;
