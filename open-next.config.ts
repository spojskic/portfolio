import { defineCloudflareConfig } from '@opennextjs/cloudflare';

const openNextConfig = defineCloudflareConfig();

export default {
  ...openNextConfig,
  buildCommand: 'next build',
};
