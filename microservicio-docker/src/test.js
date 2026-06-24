/**
 * Test simple sin frameworks de testing externos.
 * Levanta el servidor, hace peticiones HTTP reales y valida la respuesta.
 */
const http = require('http');
const app = require('./index');

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(data) }));
    }).on('error', reject);
  });
}

async function runTests() {
  // Esperar a que el servidor esté listo
  await new Promise((r) => setTimeout(r, 500));

  let passed = 0;
  let failed = 0;

  // Test 1: /hello con name=Ana
  const res1 = await get('/hello?name=Ana');
  if (res1.status === 200 && res1.body.message === 'Hola Ana desde Docker') {
    console.log('✅ Test 1 OK: GET /hello?name=Ana ->', JSON.stringify(res1.body));
    passed++;
  } else {
    console.log('❌ Test 1 FALLÓ:', JSON.stringify(res1));
    failed++;
  }

  // Test 2: /hello sin name (valor por defecto)
  const res2 = await get('/hello');
  if (res2.status === 200 && res2.body.message === 'Hola Mundo desde Docker') {
    console.log('✅ Test 2 OK: GET /hello ->', JSON.stringify(res2.body));
    passed++;
  } else {
    console.log('❌ Test 2 FALLÓ:', JSON.stringify(res2));
    failed++;
  }

  // Test 3: /health
  const res3 = await get('/health');
  if (res3.status === 200 && res3.body.status === 'UP') {
    console.log('✅ Test 3 OK: GET /health ->', JSON.stringify(res3.body));
    passed++;
  } else {
    console.log('❌ Test 3 FALLÓ:', JSON.stringify(res3));
    failed++;
  }

  console.log(`\nResultado: ${passed} pasaron, ${failed} fallaron`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
