#### A TimePicker lets the user select a single time.

### 👍 Dos

### 👎 Don'ts

### Supported locales

You can check out the list of supported locales [here](https://github.com/date-fns/date-fns/blob/master/src/locale/index.js).

Simple _TimePicker_

```js
initialState = { date1: undefined, date2: undefined, date3: undefined }
;<div>
  <div className="mb5">
    <TimePicker
      label="Small"
      size="small"
      placeholder="Select a time..."
      value={state.date1}
      onChange={date => setState({ date1: date })}
      locale="pt-BR"
    />
  </div>
  <div className="mb5">
    <TimePicker
      label="Regular"
      placeholder="Select a time..."
      value={state.date2}
      onChange={date => setState({ date2: date })}
      locale="pt-BR"
    />
  </div>
  <div className="mb5">
    <TimePicker
      label="Large"
      placeholder="Select a time..."
      size="large"
      value={state.date3}
      onChange={date => setState({ date3: date })}
      locale="pt-BR"
    />
  </div>
</div>
```

Locale

```js
initialState = { locale: 'pt-BR', date: undefined }
;<div>
  <div className="mb5">
    <RadioGroup
      name="locale"
      label="Choose locale for DateTimePicker"
      options={[
        { value: 'pt-BR', label: 'pt-BR' },
        { value: 'en-US', label: 'en-US' },
        { value: 'en-GB', label: 'en-GB' },
        { value: 'es', label: 'es' },
      ]}
      value={state.locale}
      onChange={e => setState({ locale: e.target.value })}
    />
  </div>
  <div className="mb5">
    <TimePicker
      placeholder="Select a time..."
      locale={state.locale}
      value={state.date}
      onChange={date => setState({ date })}
    />
  </div>
</div>
```

Using ref

```js
initialState = { date: undefined }
const ref = React.createRef()
;<div>
  <div className="mb5">
    <TimePicker
      ref={ref}
      label="Click in the button below to focus on this TimePicker"
      placeholder="Select a time..."
      value={state.date}
      onChange={date => setState({ date })}
      locale="pt-BR"
    />
  </div>

  <div className="mb5">
    <Button onClick={() => ref.current.focus()}>Focus!</Button>
  </div>
</div>
```
