
import { styled, Box, Typography, keyframes, GlobalStyles } from '@mui/material';

// Define a keyframe animation for the slide effect
const slideFromTop = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

// Include the font import using GlobalStyles
const Fonts = styled(GlobalStyles)`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Montserrat&family=Pacifico&family=Rubik+Doodle+Shadow&family=Whisper&display=swap');
`;

const Image = styled(Box)`
  width: 100%;
  height: 50vh;
  margin-bottom: 20px;
  background-image: url('https://4kwallpapers.com/images/walls/thumbs_2t/12485.jpg');
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  // Apply the slide animation to Image
  animation: ${slideFromTop} 1s ease-in-out;
`;

const Heading = styled(Typography)`
  font-size: 80px;
  color: #fff;
  text-align: center;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6;/* Neon green color or your preferred neon color */
  line-height: 1;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(0);
  font-family: 'Rubik Doodle Shadow', system-ui; /* Using Rubik Doodle Shadow font from the imported styles */
`;

const SubHeading = styled(Typography)`
  font-size: 20px;
  color: #fff;
  text-align: center;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6;/* Neon green color or your preferred neon color */
  position: absolute;
  top: 70%;
  transform: translateY(-50%) translateX(0);
  font-family: 'Rubik Doodle Shadow', system-ui; /* Using Rubik Doodle Shadow font from the imported styles */
`;

const Banner = () => {
  return (
    <>
      <Fonts /> {/* Include the Fonts component */}
      <Image>
        <Heading>Blog</Heading>
        <SubHeading>Blog for everyone</SubHeading>
      </Image>
    </>
  );
};

export default Banner;
