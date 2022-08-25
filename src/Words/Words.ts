import axios from 'axios';
import { ANSWERS_SIZE } from '../AppConfig';

const parseData = (data) => {
    return Array.from(data.split("\n")).map((w: string) => w.toUpperCase());
}

const getAnswers = async (): Promise<string[]> => {
    const { data } = await axios.get('./Answers.txt');
    return parseData(data);
}

const getAllowedWords = async (): Promise<string[]> => {
    const { data } = await axios.get('./Allowed.txt');
    return parseData(data);
}

const getRandomIdx = (max): number => {
	return Math.floor(Math.random() * (max + 1)); 
}

export const getWordValid = async () => {
    const words = await getAnswers();
    const wIdx = getRandomIdx(ANSWERS_SIZE);
    return words[wIdx];
}

export const getAllowedWordsSet = async (): Promise<Set<string>> => {
    const allowedWords = await getAllowedWords();
    const answerWords = await getAnswers();
    return new Set([...allowedWords, ...answerWords]);
}