# Effects

### Methods
#### `focusInput` - Focus specific input

Example below will autofocus input:
```ts
import { createRefStore, focusInput } from 'dom-effects'

const inputRef = createRefStore<HTMLInputElement>()

sample(inputRef.refAdded, focusInput)
```

#### `preventDefault`

Example below will prevent clicks on a specific target:
```ts
import { click, onTarget, createRefStore, preventDefault } from 'dom-effects'

const blockRef = createRefStore<HTMLDivElement>()

sample({
  clock: onTarget({ 
    clock: click, 
    current: blockRef.$current, 
    deep: true 
  }),
  target: preventDefault
})
```

#### `stopPropagation`

Example below will stop event propagation from a specific ref
```ts
import { click, onTarget, createRefStore, preventDefault } from 'dom-effects'

const linkRef = createRefStore<HTMLDivElement>()

sample({
  clock: onTarget({ 
    clock: click, 
    current: linkRef.$current,
  }),
  target: stopPropagation
})
```
