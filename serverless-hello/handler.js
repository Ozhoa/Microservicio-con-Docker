'use strict';

/**
 * Handler estilo AWS Lambda + API Gateway.
 * GET /hello?name=Ana -> { "message": "Hola Ana desde Docker" }
 *
 * Este mismo código funciona tal cual si se despliega a AWS Lambda real
 * (api-gateway proxy integration), solo cambia el archivo de infraestructura
 * (serverless.yml) según el proveedor.
 */
module.exports.hello = async (event) => {
  const name = (event.queryStringParameters && event.queryStringParameters.name) || 'Mundo';

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: `Hola ${name} desde Docker` }),
  };
};
