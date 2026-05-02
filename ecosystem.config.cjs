module.exports = {
  apps: [
    {
      name: "syarfandi-portfolio",
      script: "npm",
      args: "run dev -- --port 3006",
      watch: true,
      env: {
        NODE_ENV: "development",
      }
    }
  ]
};
