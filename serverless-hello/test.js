/**
 * Test del handler Lambda invocándolo directamente (simulando el event
 * que enviaría API Gateway), sin depender de que 'serverless offline'
 * esté corriendo. Útil para validar la lógica de negocio de forma aislada.
 */
const { hello } = require('./handler');

async function runTests() {
  let passed = 0;
  let failed = 0;

  // Test 1: con name=Ana
  const event1 = { queryStringParameters: { name: 'Ana' } };
  const res1 = await hello(event1);
  const body1 = JSON.parse(res1.body);
  if (res1.statusCode === 200 && body1.message === 'Hola Ana desde Docker') {
    console.log('✅ Test 1 OK:', res1.body);
    passed++;
  } else {
    console.log('❌ Test 1 FALLÓ:', JSON.stringify(res1));
    failed++;
  }

  // Test 2: sin queryStringParameters (caso real cuando no se manda query string)
  const event2 = { queryStringParameters: null };
  const res2 = await hello(event2);
  const body2 = JSON.parse(res2.body);
  if (res2.statusCode === 200 && body2.message === 'Hola Mundo desde Docker') {
    console.log('✅ Test 2 OK:', res2.body);
    passed++;
  } else {
    console.log('❌ Test 2 FALLÓ:', JSON.stringify(res2));
    failed++;
  }

  console.log(`\nResultado: ${passed} pasaron, ${failed} fallaron`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
