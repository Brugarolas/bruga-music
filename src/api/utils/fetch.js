import 'unfetch/polyfill';
import Yaku from 'yaku/lib/yaku.aplus';

window.Promise = window.Promise || Yaku;

export default fetch;
