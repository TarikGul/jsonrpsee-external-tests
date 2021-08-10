import { ArgumentParser, Namespace } from 'argparse';

export const parseArgs = (): Namespace => {
	const parser = new ArgumentParser();

	parser.add_argument('-v', '--version', { action: 'store_true' });
	parser.add_argument('-c', '--chaintype', { default: 'substrate-dev' });
	parser.add_argument('-m', '--method');

	return parser.parse_args() as Namespace;
};
