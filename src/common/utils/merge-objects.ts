export function mergeObjects(queryRaw: Array<object>) {
  let mergedQuery: any = {};

  for (const query of queryRaw) {
    if (Object.keys(query).length === 0) continue;
    mergedQuery = { ...mergedQuery, ...query };
  }

  return { where: { AND: [mergedQuery] } };
}
