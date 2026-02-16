export default async (req, res) => {
  const { reqHandler } = await import('../dist/ng-eccomerce/server/server.mjs');
  return reqHandler(req, res);
};
