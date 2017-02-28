import { message1 } from './module';
console.log(message1)

import { message2 } from './module1';
console.log(message2);

const message3 = require('./module2').message3;
console.log(message3);