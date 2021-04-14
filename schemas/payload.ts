import { Task } from "durable-functions/lib/src/classes";

export interface Action 
{
    readonly name: string;
}

export interface SingleAction extends Action
{
    readonly payload: string;
}

export interface CompositeAction
{
    readonly actions: Action[];
}

export interface AnyOf extends CompositeAction 
{
    readonly name: "AnyOf";
}

export interface AllOf extends CompositeAction
{
    readonly name: "AllOf";
}

export interface ExternalApi extends SingleAction
{
    readonly name: "ExternalApi";
    readonly method: string;
    readonly uri: string;
}