import CryptoJS from 'react-native-crypto-js';
import {monthsListKrill, monthsListRu, monthsListUz} from './data';

export function phoneString(str: string, type?: string) {
  return `${str?.slice(0, 4)} ${type === 'hidden' ? '**' : str?.slice(4, 6)} ${
    type === 'hidden' ? '***' : str?.slice(6, 9)
  } ${str?.slice(9, 11)} ${str?.slice(11, 13)}`;
}

export const postDataClear = (obj: any, n: string[]) => {
  let newObj = JSON.parse(JSON.stringify(obj));
  // let newObj = structuredClone(obj);
  let el: any;
  for (el in newObj) {
    if (n.includes(el)) {
      delete newObj[el];
    }
  }
  return newObj;
};

export const compareObj = (obj1: any, obj2: any) => {
  let arr = [];
  for (let el in obj1) {
    if (obj1[el] === obj2[el]) {
      arr.push(el);
    }
  }

  return arr;
};

export const handleEncrypted = (): string => {
  return CryptoJS.AES.encrypt(
    JSON.stringify({
      client: 'zuv',
      secret: 'gCosGwTqCNCpIoGnS28V7TfD2V0obDbPaJSY6LvmN7Lg0XPl5Rt6ne9vdbwL+Q',
      time: Date.now(),
    }),
    'G2DPdL0RN2ldSRuKpnWSRlfZrzBBEtc0qhZ+xQaRjjdTZdV89bausl1KR6l1SkqY',
  ).toString();
};

export const priceFormat = (price: string) => {
  var formatter = new Intl.NumberFormat('uz-UZ', {
    currency: 'UZS',
  });

  return formatter.format(Number(price));
};

export const time = (date: number) => {
  const clock = new Date(Number(date));
  return clock.toTimeString().slice(0, 5);
};

export const isDate = (date: number, ll: string) => {
  let d = new Date(Number(date));
  const day = d.getDate();
  const month = d.getMonth();
  return onCheckingLang(ll, day, month);
};

export const onCheckingLang = (lang: string, day: number, month: number) => {
  switch (lang) {
    case 'uz':
      return `${day} - ${monthsListUz[month]}`;
    case 'ru':
      return `${day} - ${monthsListRu[month]}`;
    case 'kr':
      return `${day} - ${monthsListKrill[month]}`;
    default:
      return `${day} - ${monthsListUz[month]}`;
  }
};

export const onCheckingLocatonLang = (lang: string) => {
  switch (lang) {
    case 'uz':
      return 'name_uz';
    case 'ru':
      return 'name_ru';
    case 'kr':
      return 'name_oz';
    default:
      return 'name_uz';
  }
};

export const removeSpace = (text: string): string => {
  return text.replace(/\s/g, '');
};

export const checkingPhone = (value: string) => {
  let val: string = '';
  val = value
    .replace(/\D/g, '')
    .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,6})/);
  val = !val[2]
    ? val[1]
    : val[1] +
      ' ' +
      val[2] +
      (val[3] ? ' ' + val[3] : '') +
      (val[4] ? ' ' + val[4] : '') +
      (val[5] ? ' ' + val[5] : '');
  return '+' + val;
};
