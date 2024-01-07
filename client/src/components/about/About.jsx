
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
  background-image: url(https://4kwallpapers.com/images/wallpapers/outrun-neon-dark-background-purple-3840x2160-4523.jpg);
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
`;

const Wrapper = styled(Box)`
position: relative;
color: white;
padding: 100px;
   & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
  color: white;
  position: relative;
`;

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
        <Typography variant="h3">Blog for everyone</Typography>
        <Text variant="h5">
          I'm a Btech student in VIT-AP. I'm a full stack web developer and I have done some various projects.
          <br />
          If you are interested, you can view my projects{' '}
          <Link href="https://github.com/kondarapukartik" color="inherit" target="_blank">
            here
          </Link>
        </Text>
        <Text variant="h5">
          <Box
            component="span"
            style={{
              marginTop: '20px',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link href="https://github.com/kondarapukartik" color="inherit" target="_blank">
              <GitHub style={{ marginRight: '10px' }} />
            </Link>
            <Link href="" color="inherit" target="_blank">
              <Instagram style={{ margin: '0 10px' }} />
            </Link>
            <Link href="" target="_blank" color="inherit">
              <Email style={{ marginLeft: '10px' }} />
            </Link>
          </Box>
        </Text>
      </Wrapper>
        </Box>
    )
}

export default About;