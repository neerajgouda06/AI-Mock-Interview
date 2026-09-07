import { AssemblyAI } from 'assemblyai';
import fs from 'fs';
import path from 'path';
import os from 'os';

let client = null;

const getAssemblyAIClient = () => {
  if (!client) {
    if (!process.env.ASSEMBLYAI_API_KEY) {
      throw new Error('ASSEMBLYAI_API_KEY environment variable is missing.');
    }
    client = new AssemblyAI({
      apiKey: process.env.ASSEMBLYAI_API_KEY,
    });
  }
  return client;
};

export const transcribeAudio = async (audioBuffer, originalName) => {
  const allowedExtensions = ['.webm', '.wav', '.mp3', '.m4a', '.ogg', '.aac', '.flac'];
  let rawExt = path.extname(originalName || '').toLowerCase();
  const extension = allowedExtensions.includes(rawExt) ? rawExt : '.webm';
  const tempPath = path.join(os.tmpdir(), `interview-audio-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${extension}`);

  try {
    fs.writeFileSync(tempPath, audioBuffer);

    const aiClient = getAssemblyAIClient();
    const transcript = await aiClient.transcripts.transcribe({
      audio: tempPath,
      speech_models: ['universal-2'],
    });

    if (transcript.status === 'error') {
      throw new Error(`Transcription failed: ${transcript.error}`);
    }

    return transcript.text || '[No speech detected in the recording]';
  } catch (error) {
    console.error('AssemblyAI Transcription Error:', error.message);
    throw new Error('Speech-to-text service is currently unavailable.');
  } finally {
    try {
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    } catch (cleanupError) {
      console.error('Temp file cleanup error:', cleanupError.message);
    }
  }
};