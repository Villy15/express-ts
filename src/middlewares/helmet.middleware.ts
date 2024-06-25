import helmet from 'helmet';

const helmetConfig = helmet({
  // To fix The resource at “http://localhost:8000/assets/AFAC%20(square).png” was blocked due to its Cross-Origin-Resource-Policy header (or lack thereof). See https://developer.mozilla.org/docs/Web/HTTP/Cross-Origin_Resource_Policy_(CORP)#
  crossOriginResourcePolicy: { policy: 'cross-origin' },
});

export default helmetConfig;
