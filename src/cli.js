#!/usr/bin/env node

'use strict';

const Args = require('./args');

new Args(process.argv.slice(2));