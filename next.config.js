const withPWA = require('next-pwa')({
  dest: 'public'
})
/** @type {import('next').NextConfig} */

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
})
