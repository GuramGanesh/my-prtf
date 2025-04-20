
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://GuramGanesh.github.io/my-prtf/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/my-prtf"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 9496, hash: '9d4670ccbf732169e00f1549566e8d7bc94dc06f067ad670322b895b07b289d1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1618, hash: 'e03eff55dca967c57bf8e83578221c1b846d144157622f8506b3096cbcb6129e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 8157, hash: 'da2d40374e2088ea6400e389c4f55a7e7c474a60dda89ba446dd740e11e6a704', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-54EDTLGR.css': {size: 303056, hash: '9zSFlyv1Gm4', text: () => import('./assets-chunks/styles-54EDTLGR_css.mjs').then(m => m.default)}
  },
};
