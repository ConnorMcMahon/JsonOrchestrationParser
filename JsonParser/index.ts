/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

import * as df from "durable-functions";
import { DurableOrchestrationContext } from "durable-functions/lib/src/durableorchestrationcontext";
import { Task } from "durable-functions/lib/src/tasks/task";
import { TaskBase } from "durable-functions/lib/src/tasks/taskinterfaces";
import {Action, AnyOf, AllOf, ExternalApi, SingleAction } from "../schemas/payload";

const orchestrator = df.orchestrator(function* (context) {
    const actions = context.df.getInput() as Action[];

    for (const action of actions) {
        yield GetTask(context.df, action);
    }
});

function GetTask(context: DurableOrchestrationContext, action: Action) : TaskBase
{
    if (action.name == "ExternalApi") {
        const apiAction = action as ExternalApi;
        return context.callHttp(apiAction.method, apiAction.uri, apiAction.payload);
    } else if (action.name == "AnyOf") {
        const anyOfAction = action as AnyOf;
        return context.Task.any(anyOfAction.actions.map((subAction) => GetTask(context, subAction) as Task));
    } else if (action.name == "AllOf") {
        const allOfAction = action as AllOf;
        return context.Task.all(allOfAction.actions.map((subAction) => GetTask(context, subAction) as Task));
    } else {
        const internalAction = action as SingleAction;
        return context.callActivity(internalAction.name, internalAction.payload);
    }
}

export default orchestrator;
