module.exports = {
  apps: [
    {
      name: 'ustrix-web',
      script: './node_modules/next/dist/bin/next',
      args: 'dev --hostname 0.0.0.0 --port 3000',
      cwd: '/opt/ustrix/web/ustrix-web',
      interpreter: '/home/vagrant/.nvm/versions/node/v24.17.0/bin/node',
      env: {
        NODE_ENV: 'development',
        PATH: '/home/vagrant/.nvm/versions/node/v24.17.0/bin:/usr/local/bin:/usr/bin:/bin'
      },
      watch: false,
      autorestart: true,
      max_restarts: 10
    }
  ]
};
