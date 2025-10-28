import Fastify from 'fastify';
const app = Fastify();
app.get('/healthz', async () => ({ ok: true }));
app.listen({ host: '0.0.0.0', port: 4020 }).then(() => console.log('x402 gateway running'));