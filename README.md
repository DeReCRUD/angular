# De Re CRUD (Angular)

This is the Angular wrapper for [Core](https://github.com/DeReCRUD/core) library.

## Getting Started

Follow the steps listed in the [Core](https://github.com/DeReCRUD/core) library.

Install library:

```bash
npm install --save @de-re-crud/angular #or, yarn add @de-re-crud/angular
```

Import and register `DeReCrudModule`:

```typescript
import { DeReCrudModule } from '@de-re-crud/angular';

@NgModule({
  /* ... */
  imports: [/* ... */, DeReCrudModule]
})
export class AppModule {}
```

Use the component selector:

Component

```typescript
import { Bootstrap3RendererOptions } from "@de-re-crud/renderer-bootstrap3";
import schemaJson from "./schema.json";

@Component({ /* ... */ })
export class AppComponent {
  rendererOptions = Bootstrap3RendererOptions;
  schema = schemaJson;
}
```

Template

```html
<drc-form [rendererOptions]="rendererOptions" [schema]="schemaJson" struct="struct" submitForm="onSubmit($event)">
```
