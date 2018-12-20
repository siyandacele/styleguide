#### Conditions works like a filter

 - Conditions component is based on creating statements.

### Statements
 - Statements are composed of 3 basic atoms (subject, verb and object), here are some use cases if you are filtering user data for example:

  - Filtering a specific user by name

    - subject: User Name
    - verb: is
    - object: Jhon Doe

  - Filtering gmail users

    - subject: Email
    - verb: contains
    - object: @gmail.com

### 👍 Dos
- Use clear verbs and subjects, which should be intuitive and provide sufficient context for the user take that decision.
- Initialize it with a default value that makes sense to your needs. (example: initial render already with an active filter)

### 👎 Don'ts
- Don't use too complex components as objects for a statement. If your statement object is too complex, maybe you should break it in simpler statements options and the complex case can be contemplated by using multiple simpler statetments.

Simple

```js
const initialState = {
  statements: [],
  operator: 'all',
}

class SimpleConditionsCase extends React.Component {
  constructor() {
    super()

    this.state = initialState
    this.handleToggleOperator = this.handleToggleOperator.bind(this)
    this.simpleInputObject = this.simpleInputObject.bind(this)
  }

  handleToggleOperator(operator) {
    this.setState({ operator: this.state.operator === 'all' ? 'any' : 'all' })
  }

  simpleInputObject({ statements, values, statementIndex, error }) {
    return (
      <Input
        value={values}
        onChange={e => {
          statements[statementIndex].object = e.target.value
          this.setState({ statements })
        }}
      />
    )
  }

  render() {
    const choices = {
      name: {
        label: 'User name',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: this.simpleInputObject,
          },
          {
            label: 'is not',
            value: '!=',
            object: this.simpleInputObject,
          },
        ],
      },
      email: {
        label: 'Email',
        verbs: [
          {
            label: 'contains',
            value: 'contains',
            object: this.simpleInputObject,
          },
          {
            label: 'is',
            value: '=',
            object: this.simpleInputObject,
          },
          {
            label: 'is not',
            value: '!=',
            object: this.simpleInputObject,
          },
        ],
      },
    };

    return (
      <Conditions
        choices={choices}
        statements={this.state.statments}
        operator="all"
        onChangeOperator={this.handleToggleOperator}
        onChangeStatements={(statements) => this.setState({ statements })}
      />
    )
  }
}
;<SimpleConditionsCase />
```

Complex

```js
const initialState = {
  statements: [],
  operator: 'all',
}

const possibleColors = [
  { label: 'White', value: 'white' },
  { label: 'Black', value: 'black' },
  { label: 'Grey', value: 'grey' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Brown', value: 'brown' },
  { label: 'Pink', value: 'pink' },
  { label: 'Orange', value: 'orange' },
  { label: 'Purple', value: 'purple' },
  { label: 'Dark-blue', value: 'dark-blue' },
  { label: 'Dark-red', value: 'dark-red' },
  { label: 'Light-blue', value: 'light-blue' },
]

class SimpleConditionsCase extends React.Component {
  constructor() {
    super()

    this.state = initialState
    this.handleToggleOperator = this.handleToggleOperator.bind(this)
    this.complexDropdownObject = this.complexDropdownObject.bind(this)
    this.complexMultiselectObject = this.complexMultiselectObject.bind(this)
    this.complexDatePickerObject = this.complexDatePickerObject.bind(this)
    this.complexDatePickerRangeObject = this.complexDatePickerRangeObject.bind(this)
    this.complexNumericStepperObject = this.complexNumericStepperObject.bind(this)
    this.complexNumericRangeObject = this.complexNumericRangeObject.bind(this)
  }

  handleToggleOperator(operator) {
    this.setState({ operator: this.state.operator === 'all' ? 'any' : 'all' })
  }

  complexDropdownObject({ statements, values, statementIndex, error }) {
    return (
      <Dropdown
        value={values}
        options={possibleColors}
        onChange={(e, value) => {
          statements[statementIndex].object = value

          this.setState({ statements })
        }}
      />
    )
  }

  complexMultiselectObject({ statements, values, statementIndex, error }) {
    return (
      <div className="nt3">
        <MultiSelect
          emptyState={term => {
            return `Your search for the color "${term}" did not find any results.`
          }}
          options={possibleColors}
          onChange={selected => {
            statements[statementIndex].object = selected

            this.setState({ statements })
          }}
          selected={values || []}
        />
      </div>
    )
  }

  complexDatePickerObject({ statements, values, statementIndex, error }) {
    return (
      <DatePicker
        value={values}
        onChange={date => {
          statements[statementIndex].object = date

          this.setState({ statements })
        }}
        locale="en-US"
      />
    )
  }

  complexDatePickerRangeObject({ statements, values, statementIndex, error }) {
    return (
      <div className='flex'>
        <div style={{ maxWidth: 140 }}>
          <DatePicker
            style={{ maxWidth: 140 }}
            value={values && values.from}
            onChange={date => {
              statements[statementIndex].object = {
                ...statements[statementIndex].object || {},
                from: date,
              }
              
              this.setState({ statements })
            }}
            locale="en-US"
          />
        </div>

        <div className="mv4 mh3 c-muted-2 b">and</div>

        <div style={{ maxWidth: 140 }}>
          <DatePicker
            value={values && values.to}
            onChange={date => {
              statements[statementIndex].object = {
                ...statements[statementIndex].object || {},
                to: date,
              }
              
              this.setState({ statements })
            }}
            locale="en-US"
          />
        </div>
      </div>
    )
  }

  complexNumericStepperObject({ statements, values, statementIndex, error }) {
    return (
      <NumericStepper
        value={values}
        onChange={e => {
          statements[statementIndex].object = e.value
          this.setState({ statements })
        }}
      />
    )
  }

  complexNumericRangeObject({ statements, values, statementIndex, error }) {
    return (
      <div className="br2 bw1 bg-base hover-b--muted-3 ba b--muted-4 ph4">
        <Slider
          range
          min={0}
          max={125}
          defaultValue={values && values.from && values.to ? [values.from, values.to] : []}
          onChange={([leftValue, rightValue]) => {
            statements[statementIndex].object = {
              ...statements[statementIndex].object || {},
              from: leftValue,
              to: rightValue,
            }
            
            this.setState({ statements })
          }}
        />
      </div>
    )
  }


  render() {
    const choices = {
      age: {
        label: 'User age',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: this.complexNumericStepperObject,
          },
          {
            label: 'is between',
            value: 'between',
            object: this.complexNumericRangeObject,
          }
        ],
      },
      color: {
        label: 'User favorite color',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: this.complexDropdownObject,
          },
          {
            label: 'is any of',
            value: 'any',
            object: this.complexMultiselectObject,
          },
        ],
      },
      birthday: {
        label: 'User birthday',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: this.complexDatePickerObject,
          },
          {
            label: 'is between',
            value: 'between',
            object: this.complexDatePickerRangeObject,
          }
        ],
      },
    };

    return (
      <Conditions
        choices={choices}
        statements={this.state.statments}
        operator="all"
        onChangeOperator={this.handleToggleOperator}
        onChangeStatements={(statements) => this.setState({ statements })}
      />
    )
  }
}
;<SimpleConditionsCase />
```