import glob from 'glob';
import path from 'path';

const basePath = path.join(process.cwd());

describe('Resolvers', () => {
  // Find all our resolver files
  const files = glob.sync(`${basePath}**/*.test.js`);

  files.forEach((file) => {
    describe(file, () => {
      const resolvers = require(file);

      Object.entries(resolvers).forEach(([name, fn]) => {
        it(name, () => Promise.resolve(fn()));
      });
    });
  });
});
