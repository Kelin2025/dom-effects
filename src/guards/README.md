# Guards

### Methods 

#### `onTarget` - Filter events by a specific target

Example below will trigger event only when clicked on `blockRef`:

```ts
import { createRefStore, click, onTarget } from 'dom-effects'

const blockRef = createRefStore<HTMLDivElement>()

const blockClicked = onTarget({
  clock: click,
  current: blockRef.$current,
  prevent: true // Optional. Similar to evt.preventDefault()
})
```

#### `offTarget` - Reversed `onTarget`

Example below will trigger event always except `blockRef`:

```ts
import { createRefStore, click, onTarget } from 'dom-effects';

const blockRef = createRefStore<HTMLDivElement>();

const blockClicked = offTarget({
  clock: click,
  current: blockRef.$current,
  prevent: true // Optional. Similar to evt.preventDefault()
});
```
