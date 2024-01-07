import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';

import { API } from '../../../service/api';

//components
import Comment from './Comment';

const Container = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(2),
}));

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%',
    marginRight: 16,
});

const StyledTextArea = styled(TextareaAutosize)(({ theme }) => ({
    height: 100,
    width: '100%', 
    margin: 0,
    padding: theme.spacing(1),
    fontSize: theme.typography.body1.fontSize,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    resize: 'vertical',
}));

const PostButton = styled(Button)(({ theme }) => ({
    height: 40,
    marginLeft: theme.spacing(2),
}));

const CommentsContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: '',
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            const response = await API.getAllComments(post._id);
            if (response.isSuccess) {
                setComments(response.data);
            }
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async () => {
        await API.newComment(comment);
        setComment(initialValue)
        setToggle(prev => !prev);
    }
    
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    rowsMin={5} 
                    placeholder="What's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <PostButton 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    onClick={(e) => addComment(e)}
                >
                    Post
                </PostButton>             
            </Container>
            <CommentsContainer>
                {
                    comments && comments.length > 0 && comments.map((comment, index) => (
                        <Comment key={index} comment={comment} setToggle={setToggle} />
                    ))
                }
            </CommentsContainer>
        </Box>
    )
}

export default Comments;
