import * as core from '@actions/core'
import { Octokit } from "octokit";
import { createAppAuth } from "@octokit/auth-app";

const trigger = async () => {
    const appId = core.getInput('appId');
    const privateKey = core.getInput('privateKey');
    const owner = core.getInput('owner');
    const repo = core.getInput('repo');
    const workflowId = core.getInput('workflowId');
    const installationId = core.getInput('installationId');
    const ref = core.getInput('ref') ?? 'main';

    const octokit = new Octokit({
        authStrategy: createAppAuth,
        auth: {
            appId,
            privateKey,
            installationId
        },
    });

    console.log(`Triggering workflow ${workflowId} in ${owner}/${repo}`);
    await octokit.request(`POST /repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`, {
        ref
    })
}

trigger().catch(error => {
    core.setFailed(error.message);
})