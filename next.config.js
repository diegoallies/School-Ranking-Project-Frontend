// next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',  // This pattern will match your API calls
          destination: 'https://school-ranking-project-backend.vercel.app/api/:path*',  // Backend URL
        },
      ];
    },
  };
  