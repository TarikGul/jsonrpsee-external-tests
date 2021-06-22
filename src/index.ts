import { ApiPromise, WsProvider } from '@polkadot/api';
import { Logger } from './logger';

import { tests } from './rpc';

const main = async (wsProvider: string) => {

    const logger = new Logger();

    const api = await ApiPromise.create({
        provider: new WsProvider(wsProvider)
    });

    for(let i = 0; i < tests.length; i++) {
        let callTests = tests[i];
        await callTests(api, logger);
    }

    logger.logFinalInfo();
}

if (require.main === module) {
    main('ws://127.0.0.1:9944').finally(() => process.exit(0));
}
