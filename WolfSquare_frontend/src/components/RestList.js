import React from 'react';
import RestaurantCard from './RestaurantCard';

const NoteList = ({ restaurants, func }) => {
    
    const restMaker = () => {
        return  restaurants.map( (rest,index) => { return <RestaurantCard res={rest} key={index} />}  )
    }

    return (
        <ul>
            {restMaker()} 
        </ul>
    );
}

export default NoteList;
