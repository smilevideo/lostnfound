import songs from '../../songs/songs.json';

export default (req, res) => {
    res.status(200).json(songs);
};