# Effects

### Methods
#### `focusInput` - Focus specific input

Example below will autofocus input:
```ts
import { createRefStore, focusInput } from 'dom-effects'

const inputRef = createRefStore<HTMLInputElement>()

sample(inputRef.refAdded, focusInput)
```
