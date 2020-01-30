import songs from '../../songs/songsKR.json';

export default (req, res) => {
    res.status(200).json(songs);
};