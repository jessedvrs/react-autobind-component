react-autobind-component
==========

[![npm version](https://badge.fury.io/js/powercheck.svg)](https://badge.fury.io/js/powercheck)

Use this alternative to `React.Component` to automatically bind your methods.

```shell
npm install react-autobind-component --save

# or, if you're awesome:
yarn add react-autobind-component
```

## Use case

*Problem:*
```js
import React, { Component } from 'react';

class Button extends Component {
    foo = 'bar';

    onClick() {
        this.foo;
        // -> undefined, because `this` refers to the caller of onClick
    }

    render() {
        return (
            <button onClick={this.onClick}>
                Click here
            </button>
        );
    }
}
```

*How you are used to solve this:*
```js
import React, { Component } from 'react';

class Button extends Component {
    foo = 'bar';

    constructor(props) {
        super(props);
        this.onClick = this.onclick.bind(this); // <- old solution
    }

    onClick() {
        this.foo;
        // -> 'bar'
    }

    render() {
        return (
            <button onClick={this.onClick}>
                Click here
            </button>
        );
    }
}
```

*How you are going to solve this from now on:*
```js
import React from 'react';
import Component from 'react-autobind-component'; // <- new solution

class Button extends Component {
    foo = 'bar';

    onClick() {
        this.foo;
        // -> 'bar'
    }

    render() {
        return (
            <button onClick={this.onClick}>
                Click here
            </button>
        );
    }
}
```

## How does it work?

Very simple:

```js
import { Component } from 'react';
import bindAll from 'lodash-bindall';

export default class AutoBindComponent extends Component {
    constructor() {
        super();
        bindAll(this, Object.getOwnPropertyNames(this.__proto__));
    }
};
```

The real version is slightly smarter, since it skips binding for methods like `constructor`, `componentWillMount`, `render`, etc.
