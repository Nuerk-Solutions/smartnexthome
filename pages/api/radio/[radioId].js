import axios from 'axios';

const json = require('./radio.json')

export default function handler(req, res) {
    const {radioId} = req.query

    json.map(channel => {
        if (channel.id === radioId) {
            switch (channel.id) {
                case 'deutschlandfunk':
                case 'deutschlandfunk_kultur':
                    fetchData(channel.current_song).then(data => {
                        res.send(data);
                    });
                    break;

                case 'mdr_jump':
                    fetchData(channel.current_song).then(data => {
                        const currentInfos = data.Songs[1];
                        res.send(currentInfos.title + (currentInfos.subtitle && '(' + currentInfos.subtitle + ')') + ' - ' + (currentInfos.interpret || currentInfos.author));
                    });
                    break;

                case 'nrj_sachsen':
                    fetchData(channel.current_song).then(data => {
                        res.send(data.title + ' - ' + data.artist);
                    });
                    break;
                case 'radio_dresden':
                    fetchData(channel.current_song).then(data => {
                        res.send(data.data.livestream.title + ' - ' + data.data.livestream.interpret);
                    });
                    break;
                case 'radio_dresden_2':
                    fetchData(channel.current_song).then(data => {
                        res.send(data.data.zwei.title + ' - ' + data.data.zwei.interpret);
                    });
                    break;
                case 'freitag_nacht':
                    fetchData(channel.current_song).then(data => {
                        res.send(data.data.freitagnacht.title + ' - ' + data.data.freitagnacht.interpret);
                    });
                    break;
                case 'weihnachtsradio':
                    fetchData(channel.current_song).then(data => {
                        res.send(data.data.weihnachtsradio.title + ' - ' + data.data.weihnachtsradio.interpret);
                    });
                    break;
                case 'radio_psr':
                case 'radio_rsa':
                case 'sunshine_live':
                    fetchData(channel.current_song).then(data => {
                        res.send(data.result.entry[0].song.entry[0].title + ' - ' + data.result.entry[0].song.entry[0].artist.entry[0].name);
                    });
                    break;
                case 'mdr_sachsen':
                    fetchData(channel.current_song).then(data => {
                        res.send(data.Songs[0].title + ' - ' + data.Songs[0].interpret);
                    });
                    break;
            }
        }
    });
}

const fetchData = (url) => {
    return axios.get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
}
