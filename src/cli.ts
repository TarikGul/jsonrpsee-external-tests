import { ArgumentParser } from 'argparse';

import { IParser } from './types';

export const parseArgs = (): IParser => {
	const parser = new ArgumentParser();

	parser.add_argument('-v', '--version', { action: 'store_true' });
	parser.add_argument('-c', '--chainType', { default: 'substrateDev' });
	parser.add_argument('-m', '--method');

	return parser.parse_args() as IParser;
};
