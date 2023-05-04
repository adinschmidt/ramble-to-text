# Ramble to Text

This project is an audio summarizer that allows users to record their speech and then receive a summarized text version of the audio. It uses the OpenAI API for audio transcription and text summarization.

## Prerequisites

Make sure you have Node.js and npm installed on your system. If not, follow the installation guide on the official [Node.js](https://nodejs.org/en/download) website.

## Installation

Clone this repository:

```bash
git clone https://github.com/your-repo/audio-summarizer.git
```

Navigate to the project directory:

```bash
cd audio-summarizer
```

Install the necessary packages:

```bash
npm install
```

Create a .env file in the root of the project and add your OpenAI API key:

```makefile
OPENAI_API_KEY=<your_api_key>
```

Replace `<your_api_key>` with your actual OpenAI API key.

## Running the project

Start the development server:

```bash
npm start
```

Open your browser and navigate to http://localhost:8081 (or the URL displayed in your terminal).

Click on the "Record" button to start recording your speech. Click the button again to stop recording.

After recording, a "Submit" button will appear. Click on it to transcribe and summarize the audio.

The summarized text will appear in the "Summarized Text" section below the buttons. (This might take a while.)
