import * as wasm from './arex_rs_bg.wasm';

/**
* @param {number} a
* @returns {number}
*/
export function add_two(a) {
    const ret = wasm.add_two(a);
    return ret;
}

