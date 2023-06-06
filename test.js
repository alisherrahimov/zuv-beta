let obj = {
  from_region: '',
  to_region: '',
  leaves_at_start: 112132123,
  leaves_at_end: 123123123123,
  transport_type: 'car',
};
let c = {};
let b = Object.create(c);

Object.keys(obj).forEach(item => {
  if (obj[item] !== '') {
    b[item] = obj[item];
  }
});

console.log(b);
