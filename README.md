# failed-to-load
Find script tags that have failed to load before `window.load`.

Add this attribute "onload" with "this.loaded=1" in its value (`onload="this.loaded=1"`)
```html
<script src="my-script-922a511f02d148e4c9390526d85ca519.js" onload="this.loaded=1"></script>
<script src="other-script-693e810ff27604e6da274da4c77e136c.js" onload="this.loaded=1"></script>
```

Register check for window load
```js
import { register } from 'failed-to-load';
register();
```

This will throw an ayncronous error to be caught by your global onerror callback.
> ```js
> Error{
>   message: `Failed to load necessary script tags upon window load
> my-script-922a511f02d148e4c9390526d85ca519.js
> other-script-693e810ff27604e6da274da4c77e136c.js`,
>   code: 'ERROR_NECESSARY_SCRIPT_NOT_LOADED',
>   files: [
>     [object HTMLScriptElement],
>     [object HTMLScriptElement]
>   ]
> }
> ```

Check and report manually:
```js
import { check } from 'failed-to-load';

window.addEventListener('load', () => {
  const missing = check();
  if (missing.length) {
    logger.warn({
      message: 'script files not loaded on page load',
      files: missing.map(({ src }) => src)
    })
  }
});
```
