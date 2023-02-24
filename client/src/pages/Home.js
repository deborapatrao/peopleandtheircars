import React from 'react';
import AddPerson from '../components/forms/AddPerson';
import AddCar from '../components/forms/AddCar';
import People from '../components/lists/People';
import Title from '../components/layout/Title';

const Home = () => {

    return(
        <div className="App">
        <Title />
        <AddPerson />
        <AddCar />
        <People />
      </div>
    )
}

export default Home