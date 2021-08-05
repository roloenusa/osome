#!/usr/bin/env node

const yargs = require('yargs');

const db = require('../services/database');
const Asset = require('../models/asset');
const Timeline = require('../models/timeline');

const args = yargs
  .usage('Usage: -n <name>')
  .option(
    'n',
    {
      alias: 'name',
      describe: 'The name of the asset to remove',
      type: 'string',
      default: 'guest',
    },
  )
  .argv;

const removeAsset = async (options) => {
  const asset = await Asset.findOne({ name: options.name });

  await Asset.findByIdAndDelete(asset.id);
  await Timeline.findOneAndDelete({ asset: asset.id });

  console.log('Successfully deleted:', asset.id);
  db.close();
};

removeAsset(args);
console.info('done');
