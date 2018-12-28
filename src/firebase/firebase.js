import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

  firebase.initializeApp(config);

  const database = firebase.database();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 

  export {firebase, googleAuthProvider, database as default};

 /* database.ref('expenses').on('child_removed', (snapshot)=> {
      console.log(snapshot.key, snapshot.val());
  });

  database.ref('expenses').on('child_changed', (childSnapshot, prevChildKey) => {
      console.log(childSnapshot.key, childSnapshot.val());
  });

  database.ref('expenses').on('child_added', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});*/

  /*database.ref('expenses').on('value', (snapshot) => {
      const expenses = [];
      //console.log(snapshot.val());

      snapshot.forEach((childSnapshot) => {
          expenses.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
          });
      });

      console.log(expenses);
  });
database.ref('expenses/-LTo8D9vG4rOD4ubiDwG').update({
    description: 'red dead redemption 2'
  });*/

/*database.ref('expenses')
.once('value')
.then((snapshot) => {
    const expenses = [];
    snapshot.forEach(function(expenseSnapshot) {
        expenses.push({
            id: expenseSnapshot.key,
            ...expenseSnapshot.val()
        });
    });
    console.log(expenses);
});

  /*database.ref('expenses').push(
      {
          description: 'Rent',
          note: '',
          amount: 109500,
          createdAt: 976123498763
        }
    );*/

  /*database.ref().on('value', (snapshot) => {
      const val = snapshot.val();
      console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
  }, (e) => {
      console.log('error while showing updated data: ', e);
  });

  setTimeout(() => {
      database.ref('job/company').set('Twitter');
  }, 2000);

  setTimeout(() => {
    database.ref('job/title').set('Senior Web Developer');
}, 5000);*/


  /*database.ref().on('value', (snapshot) => {
      console.log(snapshot.val());
  });*/

 /*database.ref()
 .once('value')
 .then((snapshot) => {
     const val = snapshot.val();
     console.log(val);
 })
 .catch((e) => {
     console.log('Error while fetching data: ', e);
 });*/

  /*database.ref('job/title')
  .once('value')
  .then((snapshot) => {
      const val = snapshot.val();
      console.log(val);
  })
  .catch((e) => {
      console.log('Problem fetching the data: ', e);
  });*/

  /*database.ref().set({
      name: 'Ashwin Ramachandran',
      age: 26,
      stressLevel: 6,
      job: {
          title: 'Software developer',
          company: 'Google'
      },
      location: {
          city: 'Bay Area',
          country: 'United States'
      }
  }).then(() => {
      console.log('The data was saved');
  }).catch((e) => {
      console.log('This failed. ', e);
  });*/

  /*database.ref().update({
      stressLevel: 9,
      'job/company': 'Amazon',
      'location/city': 'Seattle',
      'favoriteColor': 'blue' 
  });*/


/*database.ref('isEmployed').remove().then(() => {
    console.log('removed the field');
}).catch((e) => {
    console.log('Problem removing the field: ', e);
});*/
