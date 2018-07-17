## Notes Ma🐐s Reactjs Frontend

[tutorial p1 - giphy api get](https://tighten.co/blog/react-101-building-a-gif-search-engine)

[part 1 with notes](https://github.com/marka2g/notes-magoats/commit/170ce50498bb62a36136f304cb7a956fdfe009d4)

[tutorial p2 - redux](https://tighten.co/blog/react-101-using-redux)

> state gets complicated, we need redux

![giphy complicated state](https://tighten.co/assets/img/blog/react-part-1-state.png)

#### 3 core principles
1. Single Source of Truth -  initial state moves into a single store
2. State is read-only - `Actions` - dispatch actions instead and these actions mutate the store
3. Changes are made with pure functions - `Reducer` functions transform the state tree of your application. `Save-As` functions. *Your reducers should never mutate the state directly, but instead create a copy of the state object, modify it, and return it back.*

[tutorial p3 - routing/auth](https://tighten.co/blog/react-101-routing-and-auth)

[tutorial p4 - firbase](https://tighten.co/blog/react-101-part-4-firebase)
