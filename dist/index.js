"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const octokit_1 = require("octokit");
const auth_app_1 = require("@octokit/auth-app");
const trigger = async () => {
    var _a;
    const appId = core.getInput('appId');
    const privateKey = core.getInput('privateKey');
    const owner = core.getInput('owner');
    const repo = core.getInput('repo');
    const workflowId = core.getInput('workflowId');
    const installationId = core.getInput('installationId');
    const ref = (_a = core.getInput('ref')) !== null && _a !== void 0 ? _a : 'main';
    const octokit = new octokit_1.Octokit({
        authStrategy: auth_app_1.createAppAuth,
        auth: {
            appId,
            privateKey,
            installationId
        },
    });
    console.log(`Triggering workflow ${workflowId} in ${owner}/${repo}`);
    await octokit.request(`POST /repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`, {
        ref
    });
};
trigger().catch(error => {
    core.setFailed(error.message);
});
