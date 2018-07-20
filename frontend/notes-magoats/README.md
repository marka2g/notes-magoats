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

>  It's important to remember that the flow of data is unidirectional—it follows a very specific path through actions and reducers every single time before finally being returned to the container. Let's take a look at this diagram and walk through it together:

![unidirectional data flow](https://tighten.co/assets/img/blog/react-redux-diagram.png)



#### [When our app first loads:](https://tighten.co/blog/react-101-using-redux)
- The `App` renders as a Redux-connected container and fires an `init` action
- The `rootReducer` receives this `init` action and calls the `GifsReducer` (along with any other reducers that might be connected to it). Since the `REQUEST_GIFS` action is not being fired (which is the only action type that the `GifsReducer` cares about at the moment), the `GifsReducer` returns its default state of an empty array on `gifs.data`
- In App.js, `mapStateToProps` makes the empty `gifs.data` array available to App under `this.props.gifs`
- `mapDispatchToProps` binds the `requestGif()` action creator to the App's props, making it available under `this.props.actions.requestGifs`

#### [When user enters search text](https://tighten.co/blog/react-101-using-redux)
- The user enters text into the SearchBar, triggering its `onInputChange` event handler
- `onInputChange` fires the `onTermChange` `prop` being passed from the parent App container. `onTermChange` contains the `this.props.actions.requestGifs` action creator, and it is fired
- `requestGifs` starts an API call to Giphy and returns a `promise` while it waits for a result. It passes this promise to the `rootReducer`
- The `redux-promise` middleware sees that we are passing a promise and resolves it. It passes the result of the Giphy API request to our `rootReducer`
- The `rootReducer` passes this data through each reducer linked to it
- The `GifsReducer's` switch statement checks the action type of `REQUEST_GIFS`, which matches one of its cases. It uses the data from the `REQUEST_GIFS` action to create a new version of the state with an updated data property
- `Redux` notifies the connected `App container` that the `store` has been updated
The `App container` receives the updated gifs from `store` via `mapStateToProps` and passes it to the `GifList`
- The `GifList` and `GifItem` components render the gifs

#### [Modal - onGifSelect](https://tighten.co/blog/react-101-using-redux)
- We're adding the `onGifSelect` prop from part one back to our `GifList` and passing in the `selectedGif` argument being sent all the way up from the `GifItem` component.
- The `GifModal` has been added back in, with `modalIsOpen` and `selectedGif` being passed through as props
- `modalIsOpen` and `selectedGif` are being added to App's props from the Redux store via `mapDispatchToProps`

> {}{}{}{}{}{}{}{}{}{}{}{}{}

[tutorial p3 - routing/auth](https://tighten.co/blog/react-101-routing-and-auth)


[tutorial p4 - api with firebase](https://tighten.co/blog/react-101-part-4-firebase)
