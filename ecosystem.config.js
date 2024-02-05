module.exports = {
  apps: [
    {
      name: 'eom_api',
      script: 'node',
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: 'dist/src/main',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
