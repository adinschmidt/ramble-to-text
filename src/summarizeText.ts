import { Configuration, OpenAIApi } from 'openai';

const summarizeText = async (transcription: string): Promise<string> => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4-0314',
      messages: [
        {
            role: 'system',
            content: 'You are a transcription summarizer. You are given a transcription of someone speaking. Your job is to summarize the transcription into a few sentences, as well as to make it sound more like deliberately written prose. Do not speak of the "speaker" in the 3rd person, use the same tense as the speaker, and do not add any new information.',
        },
        {
            role: 'user',
            content: transcription,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    if (!response.data.choices || response.data.choices.length === 0 || !response.data.choices[0].message) {
      return 'error';
    }
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error summarizing text:', error);
    return 'error';
  }
};

export default summarizeText;
