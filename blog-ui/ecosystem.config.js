module.exports = {
  apps: [
    {
      name: 'blog',
      script: './pages/_app.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 80
      }
    }
  ]
}