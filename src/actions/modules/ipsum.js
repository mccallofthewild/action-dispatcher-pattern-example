import { IPSUM_GENERATE_DECLARATION_TEXT } from '../names';
import { DECLARATION_OF_INDEPENDENCE } from '../../constants/samples';

export const ipsumActions = {
	[IPSUM_GENERATE_DECLARATION_TEXT]({ dispatch }, { wordCount = 20 }) {
		const sample = DECLARATION_OF_INDEPENDENCE.toLowerCase()
			.split(/[ ,]+/)
			.filter(Boolean);
		const words = [];
		do {
			const randIndex = Math.floor(sample.length * Math.random());
			words.push(sample[randIndex]);
		} while (words.length < wordCount);
		return {
			words
		};
	}
};
