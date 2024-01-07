
import { Grid, styled } from '@mui/material';

//components
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';

const StyledHome = styled('div')({
  backgroundColor: 'black',
  color: 'white', // Add padding to the entire container
});

const Home = () => {
  return (
    <StyledHome>
      <Banner />
      <Grid container>
        <Grid item lg={2} xs={12} sm={2}>
          <Categories />
        </Grid>
        <Grid container item xs={12} sm={10} lg={10} sx={{ padding: '20px' }}>
          {/* Add padding to the posts container */}
          <Posts />
        </Grid>
      </Grid>
    </StyledHome>
  );
};

export default Home;
