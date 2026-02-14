#!/usr/bin/env bash
# Script para ejecutar tests localmente con Newman
# Uso: ./run-postman-tests.sh

set -e

echo "🚀 Iniciando servidor..."
npm start &
SERVER_PID=$!

# Esperar a que el servidor esté listo
echo "⏳ Esperando que el servidor esté disponible..."
for i in {1..30}; do
  if curl -f http://localhost:3000/health 2>/dev/null; then
    echo "✅ Servidor listo"
    break
  fi
  echo "  Intento $i/30..."
  sleep 2
done

# Ejecutar Newman
echo "🧪 Ejecutando pruebas Postman..."
mkdir -p reports

newman run postman/collection.json \
  --environment postman/environment.json \
  --reporters cli,html,json \
  --reporter-html-export reports/postman-report.html \
  --reporter-json-export reports/postman-report.json \
  --timeout-request 10000 \
  || TEST_FAILED=1

# Limpiar
echo "🛑 Deteniendo servidor..."
kill $SERVER_PID 2>/dev/null || true
wait $SERVER_PID 2>/dev/null || true

if [ "$TEST_FAILED" = "1" ]; then
  echo "❌ Las pruebas fallaron"
  exit 1
fi

echo "✅ Todas las pruebas pasaron"
echo "📊 Reporte disponible en: reports/postman-report.html"
