## Notes Ma🐐s Reactjs Frontend

[tutorial p1 - giphy api get](https://tighten.co/blog/react-101-building-a-gif-search-engine)

[part 1 with notes](https://github.com/marka2g/notes-magoats/commit/170ce50498bb62a36136f304cb7a956fdfe009d4)

> {}{}{}{}{}{}{}{}{}{}{}{}{}

[tutorial p2 - redux](https://tighten.co/blog/react-101-using-redux)

> state gets complicated, we need redux

![giphy complicated state](https://tighten.co/assets/img/blog/react-part-1-state.png)

#### 3 core principles
1. Single Source of Truth -  initial state moves into a single store
2. State is read-only - `Actions` - dispatch actions instead of your application writing to the state tree directly; instead, you dispatch an `action`, or an object that expresses your intent to mutate the store. actions are meant to signal that something happened
3. Changes are made with pure functions - `Reducer` functions transform the state tree of your application. `Save-As` functions. *Your reducers should never mutate the state directly, but instead create a copy of the state (tree) object, modify it, and return it back.*  they take 2 args(previous_state, action) and return your next state as an entirely new object

> In short, what you should take away is this: if you're using Redux, React is responsible for managing the presentation and views of our application, while Redux is in charge of data management.

[check out the new folder structure](https://github.com/tightenco/react-gif-search-engine/commit/9783326d76f4ad731a9f293128a0b684618daff8)

> reducers are simply functions responsible for transforming and returning the store of our application.
notes-magoats/frontend/notes-magoats/src/reducers/gifs.js

<!-- ```javascript
export default function(){
  return [...];
``` -->

> create rootReducer src/reducers/index.js

> mapDispatchToProps is the second, optional argument(in App container) you can pass to react-redux's connect()() method. It can be easy to confuse it with mapStateToProps, but they actually do two nearly-opposite things:

- mapDispatchToProps() passes data *from our container to the store*. It provides the ability for the container to tell the store that it needs to change and enables this by adding action creators to our container as props.
- mapStateToProps() passes data *to our container from our store*. It makes the result of reducers available to our container as props.


> {}{}{}{}{}{}{}{}{}{}{}{}{}

[tutorial p3 - routing/auth](https://tighten.co/blog/react-101-routing-and-auth)

[tutorial p4 - firbase](https://tighten.co/blog/react-101-part-4-firebase)
