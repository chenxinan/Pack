import {
    name
} from './name.js';
import {
    des
} from './describe.js';

export default function speak() {
    console.log(`我是${name}，这是我的${des}`);
}