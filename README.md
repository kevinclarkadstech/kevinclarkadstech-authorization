# My Take(s) On The Challenge of Authorization Logic

This shows ways I have attacked authorization in various ways. You will see some commonalities amongst them:

1. They are, as one popular dev coined, **"pure" functions**. There are no side effects and given the same input they will always produce the same output.
2. They follow an **ABAC** (Attribute Based Access Control) sort of pattern. Each implementation will require: <br />
   a. Subject - This is who is performing the action. _(I have made a union type of either User or ApiUser for this.)_ <br />
   b. Action - This is what they are trying to do. _(This can be as granular as possible, like trying to update a single property. See: src/implementations/human-readable-rules/update-post-status-rule/update-post-status-rule.ts)_ <br />
   c. Resource - This is the main object/data they are trying to perform the action on. <br />
   d. Additional Context - Some rules are more complex and need additional context when evaluating than only Subject or Resource. _(i.e. Actions on child entities usually require checking the parent(s))_ <br />
3. They are **synchronous**, meaning that fetching of the Subject, Resource, or Additional Context must be done beforehand, usually at the service layer.

Some benefits

1. Any characteristic of the Subject can be used in the evaluation, "role", "privilege", or a property on the subject like "isAdmin". This is more powerful than simply Role or Privilege based authorization.
2. Pure functions are great for authorization because of their predictability. Also separating the side effects like data fetching makes them easier to write and read.
3. They can be used isomorphically, i.e in a web app, React Native app, a Node.js app, or a Bun app like this one. This means you could have a shared library of models and logic so no writing logic twice!

Some cons:

1. The main con of following this pattern is that there is not a way to "short circuit" the logic as quickly as could be done by mixing the logic with the side effects in a function at the service level.
   To demonstrate, say you have a social media app, that allows posts, post comments, and reactions to post comments.

   The logic would be that a user could add a reaction to the post comment if they are not blocked or blocking the creator of the post comment OR the post.

   In a traditional method of having the logic to fetch from the db mixed with the authorization logic, the service function could get the post, see the user is blocked, and short circuit without even calling
   the database to fetch the post comment to see if the Subject is blocked by the creator of that record.

   With the authorization methods demonstrated in this repo, all context would need to be gathered from the db beforehand. So in this case, there would be an unneccessary call to fetch the post comment, because
   it is needed as part of the Additional Context along with the post. So this would be a tradeoff that needs to be evaluated.

## Implementation Ideas

1. **Class based/OOP** _src/implementations/authorization-classes_
2. **Can Generic Function based** _src/implementations/can-fn_
3. **Human readable** _src/implementations/human-readable_
4. ABAC Functional

Given(user)
TryingTo('create-post')
With(post)
Check()

Subject(user)
Action('create-post')
Resource(post)
Check()
![TestResults](https://github.com/user-attachments/assets/7e186725-2156-41c2-be24-ef5f4094f665)
