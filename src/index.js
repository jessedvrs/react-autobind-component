import { Component } from 'react';
import 'core-js/fn/object/get-own-property-names';
import bindAll from 'lodash.bindall';
import difference from 'lodash.difference';

export default class AutoBindComponent extends Component {
    constructor(...args) {
        super(...args);

        const propertyNames = Object.getOwnPropertyNames(this.__proto__);
        const userDefinedPropertyNames = difference(propertyNames, [
            'constructor',
            'componentWillMount',
            'render',
            'componentDidMount',
            'componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'componentDidUpdate',
            'componentWillUnmount',
        ]);

        bindAll(this, userDefinedPropertyNames);
    }
};
