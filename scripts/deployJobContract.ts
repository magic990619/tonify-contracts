import { toNano } from '@ton/core';
import { JobContract } from '../wrappers/JobContract';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const jobContract = provider.open(
        JobContract.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('JobContract')
        )
    );

    await jobContract.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(jobContract.address);

    console.log('ID', await jobContract.getID());
}
