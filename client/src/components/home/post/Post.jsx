
import { styled, Box, Typography } from '@mui/material';

const Container = styled(Box)`
    border: 5px solid #d3cede;
    border-radius: 10px;
    margin-left: 100px;
    margin-top:50px;
    display: flex;
    flex-direction: column;
    height: 350px;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }

    & > img{
        padding: 0 
    }
    >p{
        padding: 0 15px 15px 15px;
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150,
});

const Text = styled(Typography)`
    color: white;
    margin-top:10px;
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;

`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
    margin-top: 10px;
    flex: 1;
    overflow: hidden;
`;

const Post = ({ post }) => {
    const url = post.picture ? post.picture : 'https://storage.googleapis.com/pai-images/385cbb1747014c5eb807e972c6f246cc.jpeg';

    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    }

    return (
        <Container>
            <Image src={url} alt="post" />
            <Text>{post.categories}</Text>
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details>{addEllipsis(post.description, 100)}</Details>
        </Container>
    )
}

export default Post;
