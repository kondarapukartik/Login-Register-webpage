import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
    url: `mongodb+srv://user:user12345@cluster0.jvsmeuw.mongodb.net/?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if (match.indexOf(file.mimetype) === -1) {
            // If the file type doesn't match, use a default filename
            return `${Date.now()}-blog-${file.originalname}`;
        }

        // If the file type matches, store in the "photos" bucket
        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`,
            metadata: {
                userId: request.user._id, // Assuming you have a user object in your request
                username: request.user.username // Example: Access user properties
            }
        };
    }
});

export default multer({ storage });
