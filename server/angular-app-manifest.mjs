
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/GuramGanesh/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/GuramGanesh"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 9346, hash: 'd1be09b2750199045943d8daa4e6237e4d5a89e8981c9537e8a922ee0edcb12f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1493, hash: '804c6b7095d9e28e629ea229094524bd59cba82196583757636a961348843e10', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 29674, hash: '3c013b8724672c981c6910d650bac93a6a21e39af99b5f2d876ba60fb2b7e336', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-54EDTLGR.css': {size: 303056, hash: '9zSFlyv1Gm4', text: () => import('./assets-chunks/styles-54EDTLGR_css.mjs').then(m => m.default)}
  },
};
