module.exports = {
  apps: [
    {
      name: 'finequity-portal',
      script: 'npm',
      args: 'start',
      cwd: './',
      instances: 1, // or 'max' for cluster mode
      exec_mode: 'fork', // or 'cluster'
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true
    }
  ]
};