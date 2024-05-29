/**
 * A function for converting hex <-> dec w/o loss of precision.
 * By Dan Vanderkam http://www.danvk.org/hex2dec.html
 */
function add(x: number[], y: number[], base: number): number[] {
  const z: number[] = [];
  const n: number = Math.max(x.length, y.length);
  let carry: number = 0;
  let i: number = 0;
  while (i < n || carry) {
    const xi: number = i < x.length ? x[i] : 0;
    const yi: number = i < y.length ? y[i] : 0;
    const zi: number = carry + xi + yi;
    z.push(zi % base);
    carry = Math.floor(zi / base);
    i++;
  }
  return z;
}

function multiplyByNumber(
  num: number,
  x: number[],
  base: number,
): number[] | null {
  if (num < 0) return null;
  if (num === 0) return [];

  let result: number[] = [];
  let power: number[] = x;
  while (true) {
    if (num & 1) {
      result = add(result, power, base);
    }
    num = num >> 1;
    if (num === 0) break;
    power = add(power, power, base);
  }

  return result;
}

function parseToDigitsArray(str: string, base: number): number[] | null {
  const digits: string[] = str.split("");
  const ary: number[] = [];
  for (let i = digits.length - 1; i >= 0; i--) {
    const n: number = parseInt(digits[i], base);
    if (isNaN(n)) return null;
    ary.push(n);
  }
  return ary;
}

function convertBase(str: string, fromBase: number, toBase: number): string {
  const digits: number[] | null = parseToDigitsArray(str, fromBase);
  if (digits === null) return "";

  let outArray: number[] = [];
  let power: number[] = [1];
  for (let i = 0; i < digits.length; i++) {
    if (digits[i]) {
      outArray = add(
        outArray,
        multiplyByNumber(digits[i], power, toBase)!,
        toBase,
      );
    }
    power = multiplyByNumber(fromBase, power, toBase)!;
  }

  let out: string = "";
  for (let i = outArray.length - 1; i >= 0; i--) {
    out += outArray[i].toString(toBase);
  }
  return out;
}

export function hexToDec(hexStr: string): string {
  if (hexStr.substring(0, 2) === "0x") hexStr = hexStr.substring(2);
  hexStr = hexStr.toLowerCase();
  return convertBase(hexStr, 16, 10);
}
