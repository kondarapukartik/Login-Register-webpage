/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px auto', // Center the component horizontally
    maxWidth: '800px', // Set a max width for better readability
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: 'white',
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0', // Rounded corners only at the top
});

const StyledFormControl = styled(FormControl)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
});

const InputTextField = styled(InputBase)(({ theme }) => ({
    flex: 1,
    margin: '20px 0',
    padding: '10px',
    fontSize: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    '&:focus-within': {
        borderColor: theme.palette.primary.main,
    },
}));

const PublishButton = styled(Button)(({ theme }) => ({
    marginTop: '20px',
    padding: '15px',
    fontSize: '18px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const Textarea = styled(TextareaAutosize)({
    width: '100%',
    border: '1px solid #ccc',
    padding: '10px',
    marginTop: '20px',
    borderRadius: '4px',
    fontSize: '16px',
    '&:focus-visible': {
        outline: 'none',
    },
});

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date(),
};

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : 'https://visme.co/blog/wp-content/uploads/2020/10/Header.png';

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);

                const response = await API.uploadFile(data);
                post.picture = response.data;
            }
        };
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file]);

    const savePost = async () => {
        await API.createPost(post);
        navigate('/');
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} name="title" placeholder="Title" />
                <PublishButton onClick={() => savePost()} variant="contained">
                    Publish
                </PublishButton>
            </StyledFormControl>

            <Textarea rowsMin={5} placeholder="Tell your story..." name="description" onChange={(e) => handleChange(e)} />
        </Container>
    );
};

export default CreatePost;
