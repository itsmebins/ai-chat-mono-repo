import { hexToDec } from "./hex2dec";

/**
 * Snowflake ID Generator
 *
 * This code is based on the snowflake-id generator by Dustin Rouillard
 * (https://github.com/dustinrouillard/snowflake-id).
 *
 * The original source code is licensed under the MIT License:
 *
 * MIT License
 *
 * Copyright (c) 2021 Dustin Rouillard
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export default class Snowflake {
  private seq: number;
  private mid: number;
  private offset: number;
  private lastTime: number;

  constructor(options?: { mid?: number; offset?: number }) {
    this.seq = 0;
    this.mid = (options?.mid || 1) % 1023;
    this.offset = options?.offset || 0;
    this.lastTime = 0;
  }

  generate(): string {
    const time = Date.now();
    const bTime = (time - this.offset).toString(2);

    if (this.lastTime === time) {
      this.seq++;

      if (this.seq > 4095) {
        this.seq = 0;
        while (Date.now() <= time) {}
      }
    } else {
      this.seq = 0;
    }

    this.lastTime = time;

    let bSeq = this.seq.toString(2),
      bMid = this.mid.toString(2);

    while (bSeq.length < 12) bSeq = "0" + bSeq;
    while (bMid.length < 10) bMid = "0" + bMid;

    const bid = bTime + bMid + bSeq;
    let id = "";

    for (let i = bid.length; i > 0; i -= 4) {
      id = parseInt(bid.substring(i - 4, i), 2).toString(16) + id;
    }

    return hexToDec(id);
  }
}
