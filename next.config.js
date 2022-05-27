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
    images: {
        domains: [
            'static.tuneyou.com',
            'cdn-radiotime-logos.tunein.com',
            'cdn.mdr.de', 'cdn.jumpradio.de',
            'api.nrjnet.de',
            'webradio.radiodresden.de',
            'i1.sndcdn.com',
            'www.radio.de',
            'images.sunshine-live.de'
        ]
    }
}

module.exports = nextConfig
