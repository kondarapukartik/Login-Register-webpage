import mongoose from 'mongoose';

const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.jvsmeuw.mongodb.net/?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true, // Remove this line as it's deprecated
      useUnifiedTopology: true, // Remove this line as it's deprecated// Add this line to use the new option
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error while connecting to the database ', error);
  }
};3

export default Connection;
