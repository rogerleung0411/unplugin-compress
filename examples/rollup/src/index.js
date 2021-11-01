import('jquery').then(jq => {
  console.log('async assignment');
  globalThis.jq = jq;
});

import('./vendor/vendor1').then(c => {
  console.log(c);
});

console.log('sync console');
