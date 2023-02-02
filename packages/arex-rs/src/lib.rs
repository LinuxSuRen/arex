extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add_two(a: i32) -> i32 {
    a + 2
}