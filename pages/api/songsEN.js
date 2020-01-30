import songs from '../../songs/songsEN.json';

export default (req, res) => {
    res.status(200).json(songs);
};