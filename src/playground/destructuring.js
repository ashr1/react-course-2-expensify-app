
//Object destructuring
/*const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        //name: 'Penguin'
    }
};

const {name: publisherName = 'Self-Published'} = book.publisher;

console.log(publisherName);*/

//array destructuring

const item= ['Coffee (ice)', '$2.00', '$2.52', '$2.75'];

const [itemName, , mediumPrice] = item;

console.log(`${itemName} costs ${mediumPrice}`);