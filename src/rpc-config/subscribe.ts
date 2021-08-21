import { RpcPromiseResult, VoidFn } from '@polkadot/api/types';
import { Header, RuntimeVersion } from '@polkadot/types/interfaces';
import { Observable } from 'rxjs';

/**
 * Helper function for any subscriptions that are tested.
 *
 * @param apiFn The substrate subscription rpc method to be passed in
 * @param reqCounter How many req's to test for, when the number is met the test
 * will return true
 * @param timeCounter How many seconds to wait for the subscriptions before timing
 * out and return false
 */
export const subscribe = async (
	apiFn: RpcPromiseResult<() => Observable<Header | RuntimeVersion>>,
	reqCounter: number,
	timeCounter = 30
): Promise<boolean> => {
	let count = 0;
	let whileCounter = 0;
	let isSubscribed = true;

	const arr: (Header | RuntimeVersion)[] = [];

	const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

	const unsub: VoidFn = await apiFn((res: Header | RuntimeVersion) => {
		arr.push(res);

		if (++count === reqCounter) {
			isSubscribed = false;
			unsub();
		}
	});

	// Allow a 30 second timer to fetch the subscriptions
	while (isSubscribed) {
		await timer(1000);
		whileCounter += 1;

		// 30 Seconds has gone by so we exit the subscription
		if (whileCounter === timeCounter) {
			isSubscribed = false;
			unsub();
		}
	}

	return arr.length === reqCounter;
};
