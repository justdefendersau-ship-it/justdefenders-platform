/**
 * JustDefenders ©
 * File: C:\dev\justdefenders\ecosystem.config.cjs
 * Timestamp: 01 April 2026 14:35 (Sydney)
 */

module.exports = {
  apps: [
    {
      name: "justdefenders-harvester",
      script: "harvester.cjs",
      cwd: "C:/dev/justdefenders",

      autorestart: true,
      watch: false,
      max_restarts: 10,
      min_uptime: "5s",

      out_file: "C:/dev/justdefenders/logs/harvester-out.log",
      error_file: "C:/dev/justdefenders/logs/harvester-error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",

      instances: 1,
      exec_mode: "fork",

      env: {
        NODE_ENV: "development"
      }
    }
  ]
};