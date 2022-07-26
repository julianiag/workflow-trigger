import * as core from '@actions/core'
import { Octokit } from "octokit";
import { createAppAuth } from "@octokit/auth-app";
const ProxyAgent = require('http-proxy-agent');

const trigger = async () => {
    const appId = core.getInput('appId');
    const privateKey = core.getInput('privateKey');
    const owner = core.getInput('owner');
    const repo = core.getInput('repo');
    const workflowId = core.getInput('workflowId');
    const installationId = core.getInput('installationId');
    const ref = core.getInput('ref') ?? 'main';

    const octokit = new Octokit({
        request: {
            agent: new ProxyAgent(),
        },
        authStrategy: createAppAuth,
        auth: {
            appId,
            privateKey,
            installationId
        },
    });

    core.debug(`Triggering workflow ${workflowId} in ${owner}/${repo}`);
    await octokit.request(`POST /repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`, {
        ref
    })
    core.debug('Successfully triggered the workflow');
}

trigger().catch(error => {
    core.setFailed(error.message);
})