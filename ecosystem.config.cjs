module.exports = {
  apps: [
    {
      name: "syarfandi-portfolio",
      script: "npm",
      args: "run dev",
      watch: false, // PM2 watch is disabled because Vite handles Hot Module Replacement (HMR) internally. Enabling PM2 watch will break Vite's hot reload.
      env: {
        NODE_ENV: "development",
      }
    }
  ]
};
