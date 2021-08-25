import { RpcPromiseResult } from '@polkadot/api/types';
import { Observable } from 'rxjs';

import { SubscribeReturnTypes } from '../types';

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
	apiFn: RpcPromiseResult<() => Observable<SubscribeReturnTypes>>,
	reqCounter: number,
	timeCounter = 30
): Promise<boolean> => {
	let count = 0;
	let whileCounter = 0;
	let isSubscribed = true;

	const arr: SubscribeReturnTypes[] = [];

	const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

	/**
	 * Subscribe to an api call.
	 */
	const unsub = await apiFn((res: SubscribeReturnTypes) => {
		arr.push(res);

		if (++count === reqCounter) {
			isSubscribed = false;
			unsub();
		}
	});

	/**
	 * Timer: DEFAULT 30s
	 *
	 * This is a timer that keeps the subscription alive for a given maximum amount of time.
	 * If the `reqCounter` does not equal the `count` in this given amount of time, then it will exit
	 * the subscription with a fail.
	 */
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
