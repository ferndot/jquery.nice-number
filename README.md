# jQuery Nice Number
A tiny plugin that converts HTML numeric inputs (`type="number"`) into an
easily-styled format.

## Usage
### Prerequisites
Download the project files or install it using Yarn, NPM, etc...
```sh
$ yarn add jquery.nice-number
$ npm install jquery.nice-number --save
```

Include the plugin files in your source.
> Note: the path will need to be changed if you downloaded or moved the files.
```html
<link rel="stylesheet" href="node_modules/jquery.nice-number/dist/jquery.nice-number.min.css">
<script src="node_modules/jquery.nice-number/dist/jquery.nice-number.min.js"></script>
```

### Basic usage
Call the `niceNumber()` function on your jQuery element of choice.
> Pro Tip: use `$('input[type="number"]')` to select all numeric inputs in the
current page.
```javascript
$('input[type="number"]').niceNumber();
```

### Advanced usage
You can pass an optional object to `niceNumber()` containing advanced
configuration options.

#### Currently supported options
Name | Permitted values | Description | Default value
---- | ---------------- | ----------- | -------------
autoSize | boolean | Enables or disables automatic input sizing to fit content | `true`
autoSizeBuffer | number | The number of extra character widths that are added to the element's content size calculation when automatically sizing | `1`
buttonDecrement | jQuery element, HTML element, HTML string, or plain string | The contents of the decrement button | `'-'`
buttonIncrement | jQuery element, HTML element, HTML string, or plain string | The contents of the increment button | `'+'`
buttonPosition | `'around'`, `'left'`, or `'right'` | The positions of the control buttons | `'around'`

## Development
### Building
Install the project dependencies
```sh
$ yarn
```

Build the project
```sh
$ yarn gulp
```
