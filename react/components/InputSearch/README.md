Search

```js
const InputSearch = require('../../InputSearch').default
initialState = { value1: '', value2: '', value3: '' }
;<div>
  <form
    className="mb5"
    onSubmit={e => {
      e.preventDefault()
      console.log(state.value1)
    }}
  >
    <InputSearch
      placeholder="Search..."
      value={state.value1}
      onChange={e => setState({ value1: e.target.value })}
    />
  </form>

  <form
    className="mb5"
    onSubmit={e => {
      e.preventDefault()
      console.log(state.value2)
    }}
  >
    <InputSearch
      placeholder="Search..."
      value={state.value2}
      size="large"
      onChange={e => setState({ value2: e.target.value })}
      onSubmit={e => {
        e.preventDefault()
        console.log(state.value2)
      }}
    />
  </form>

  <form
    className="mb5"
    onSubmit={e => {
      e.preventDefault()
      console.log(state.value3)
    }}
  >
    <InputSearch
      placeholder="Search..."
      value={state.value3}
      size="x-large"
      onChange={e => setState({ value3: e.target.value })}
      onSubmit={e => {
        e.preventDefault()
        console.log(state.value3)
      }}
    />
  </form>
</div>
```
