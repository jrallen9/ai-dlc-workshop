const baseUrl = process.argv[2] || process.env.AIDLC_SITE_URL || 'http://localhost:8080';

const paths = [
  '/',
  '/register.html',
  '/task-manager.html',
  '/job-application-cdk.html',
  '/s3-file-sharing.html',
  '/ecommerce-catalog.html',
  '/brownfield-ecommerce.html',
  '/assets/css/styles.css',
  '/assets/js/script.js',
  '/assets/js/register.js',
  '/assets/js/task-manager.js',
  '/assets/js/job-application-cdk.js',
  '/assets/js/s3-file-sharing.js',
  '/assets/js/ecommerce-catalog.js',
];

function urlFor(path) {
  return new URL(path, baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`);
}

let failures = 0;

for (const path of paths) {
  const url = urlFor(path);
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) {
      failures += 1;
      console.error(`FAIL ${response.status} ${url.href}`);
    } else {
      console.log(`OK   ${response.status} ${url.href}`);
    }
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${url.href} ${error.message}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} verification check(s) failed.`);
  process.exit(1);
}

console.log('\nAll site verification checks passed.');
