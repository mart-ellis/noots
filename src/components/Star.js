import React from 'react';
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/outline'


const Star = ({ starred, className }) => {

    return (
        <>
            {starred ? <StarIconSolid className={className} /> : <StarIconOutline className={className} />}
        </>
    );
}

export default Star;
