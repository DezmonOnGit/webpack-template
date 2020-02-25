//libs
import polyfill from './modules/polyfills';

import * as jquery from 'jquery';
global.$ = global.jQuery = jquery;

require("@fancyapps/fancybox");
