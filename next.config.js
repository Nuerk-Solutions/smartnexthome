/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    generateEtags: false,
    reactStrictMode: true,
    api: {
        externalResolver: true,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}

module.exports = nextConfig
