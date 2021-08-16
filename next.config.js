module.exports = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      },
      {
        source: '/help',
        destination: '/help/introduction',
        permanent: true
      }
    ];
  }
};
