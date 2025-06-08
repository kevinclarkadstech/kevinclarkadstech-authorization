# kevinclarkadstech-authorization

This shows ways I have attacked authorization in various ways.

## Implementation Ideas

1. Class based/OOP src/authorization-classes
2. Function based src/can-fn
3. Human readable src/human-readable
4. ABAC Functional

Given(user)
TryingTo('create-post')
With(post)
Check()

Subject(user)
Action('create-post')
Resource(post)
Check()
