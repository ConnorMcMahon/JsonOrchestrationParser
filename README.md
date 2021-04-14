A Durable Functions app that takes a simple declarative representation of an orchestration and translates it to a Durable Functions orchestration.

Types of Actions:

Activity: For activity calls that are defined in the app.
{
    "name": <name-of-activity>,
    "payload": <activity input>
}

External API: For activities that aren't defined in this application (such as http triggers written by partner teams):
{
    "name": "ExternalAPI",
    "method": <http-method>
    "uri": <api-uri>,
    "payload": <content-of-http-req>
}

AllOf: Completes after all "actions" are completed. These sub actions can be AllOf or AnyOf as well.
{
    "name": "AllOf",
    "actions": <array-of-actions>
}

AnyOf: Completes after any of the "actions" are completed. These sub actions can be AllOf or AnyOf as well.
{
    "name": "AnyOf",
    "actions": <array-of-actions>
}

Payload:

An array of actions, executed sequentially. With the introduction of AnyOf and AllOf, allows fairly robust graph structures for orchestrations.

See samplepayload.json

Steps:
1. npm install
2. tsc --build
3. func host start
4. Try providing sample json payloads