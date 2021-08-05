#!/usr/bin/env node

const yargs = require('yargs');
const config = require('config');

const db = require('../services/database');
const S3 = require('../services/aws-s3');
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
  console.log('successfully removed from the database');

  const assetConfigs = config.assets;
  const promises = assetConfigs.map(async (assetOptions) => {
    const { bucket } = assetOptions;
    const key = `${bucket}/${options.name}`;
    return S3.removeObject(key, (err, data) => {
      if (err) {
        console.error(`Unable to remove ${key}`);
        console.error(err);
        return;
      }
      console.info(`successfully removed ${key}`);
    });
  });
  await Promise.all(promises);

  console.log('Successfully deleted:', asset.id);
  db.close();
};

removeAsset(args);
console.info('done');
