/* eslint-disable no-unused-vars */

import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://w0.peakpx.com/wallpaper/1011/758/HD-wallpaper-glowing-triangle-neon-neon-triangle-abstract-thumbnail.jpg);
    width: 100%;
    position:absolute;
    height: 100%;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 150px;
    color: white;
    position:relative;
    & > h3, & > h5 {
        margin-top: 70px;
        padding-left:50px
    }
`;

const Text = styled(Typography)`
    color: white;
    position:relative;
`;


const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Text variant="h5">
                    Reach out to me on
                    <Box component="span"
            style={{
              marginTop: '20px',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}>
                    <Link href="https://www.instagram.com/codeforinterview/" color="inherit" target="_blank">
                        <Instagram style={{ marginRight: '10px' }}/>
                    </Link>
                    <Link href="mailto:codeforinterview@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email style={{ marginRight: '10px' }}/>
                    </Link>
                    </Box>
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;