/* eslint-disable no-unused-vars */

import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Component = styled(AppBar)`
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 1);
    color: white;
    transition: background 0.3s ease-in-out, color 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out;

    &:hover {
        background: rgba(0, 0, 0, 0.9); /* Change the background color on hover */
        backdrop-filter: blur(15px); /* Adjust the blur effect on hover */
        color: #2196f3; /* Change the text color to blue on hover */
    }
`;

const Container = styled(Toolbar)`
    justify-content: center;

    & > a {
        padding: 20px;
        color: white;
        text-decoration: none;
        transition: color 0.3s ease-in-out;

        &:hover {
            color: #2196f3; /* Change the text color to blue on hover */
        }
    }
`;

const Header = () => {
    const navigate = useNavigate();

    const logout = async () => navigate('/account');
        
    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to='/account'>LOGOUT</Link>
            </Container>
        </Component>
    );
};

export default Header;
