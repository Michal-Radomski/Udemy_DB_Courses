const toCamelCase = (rows: { [key: string]: string | number }[]) => {
  // console.log({ rows });
  const parsedRows = rows.map((row) => {
    const replaced: { [key: string]: string | number } = {};
    for (let key in row) {
      const camelCase = key.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace("_", ""));
      replaced[camelCase] = row[key];
    }
    // console.log({ replaced });
    return replaced;
  });
  return parsedRows;
};

export default toCamelCase;
