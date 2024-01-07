import mongoose from 'mongoose';
import grid from 'gridfs-stream';

const url = 'http://localhost:8000';

let gfs, gridfsBucket;
const conn = mongoose.connection;

conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});

export const uploadImage = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'File not provided' });
        }

        const imageUrl = `${url}/file/${req.file.filename}`;

        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getImage = (req, res) => {
    try {
        const filename = req.params.filename;

        // Using GridFSBucket to open a download stream
        const readStream = gridfsBucket.openDownloadStreamByName(filename);

        // Pipe the image stream to the response
        readStream.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
