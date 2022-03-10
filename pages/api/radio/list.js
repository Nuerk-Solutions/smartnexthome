// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const json = require('./radio.json')

export default function handler(req, res) {
    res.status(200).json(json);
}
