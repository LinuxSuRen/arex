/* eslint-disable import/no-extraneous-dependencies */
import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://127.0.0.1:3170/graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/helpers/backend/gen/': {
      preset: 'client',
      presetConfig: {
        persistedDocuments: 'string'
      }
    },
  }
};

export default config;
