import unfetch from 'unfetch';
import Yaku from 'yaku/lib/yaku.aplus';

const fetch = window.fetch || unfetch;
window.Promise = window.Promise || Yaku;

export default fetch;
