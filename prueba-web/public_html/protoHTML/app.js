(function(){
    // Initialize Firebase
          var config = {
            apiKey: "AIzaSyAuSjFHm2l6wBMdAtj-BTRor27Hnn_4Tns",
            authDomain: "prueba-web-630ea.firebaseapp.com",
            databaseURL: "https://prueba-web-630ea.firebaseio.com",
            projectId: "prueba-web-630ea",
            storageBucket: "gs://prueba-web-630ea.appspot.com",
            messagingSenderId: "322979248019"
          };
          firebase.initializeApp(config);
          
          var bigOne = document.getElementById('bigOne');
          var dbRef = firebase.database().ref().child('text');
          var dbRef2 = firebase.database().ref().child('gardens');
          dbRef.on('value', snap => bigOne.innerText = snap.val());
          dbRef2.on('value', snap => bigTwo.innerText = snap.val());
          
          
          //get elements
          const txtEmail = document.getElementById('txtEmail');
          const txtPassword = document.getElementById('txtPassword');
          const btnLogin = document.getElementById('btnLogin');
          const btnSignUp = document.getElementById('btnSignUp');
          const btnLogout = document.getElementById('btnLogout');
          
          //Add login event
          btnLogin.addEventListener('click', e => {
             //get email and pass
             const email = txtEmail.value;
             const pass = txtPassword.value;
             const auth = firebase.auth();
             //Sign in
             const promise = auth.signInWithEmailAndPassword(email, pass);
             promise.catch(e => console.log(e, "Error basico"));
          });
          
          btnSignUp.addEventListener('click', e =>{
            //get email and pass
            //check for real email
             const email = txtEmail.value;
             const pass = txtPassword.value;
             const auth = firebase.auth();
             //Sign in
             const promise = auth.createUserWithEmailAndPassword(email, pass);
             promise
                     .catch(e => console.log(e, "Error basico"));
          });
          
          //add a realtime listener
          firebase.auth().onAuthStateChanged(firebaseUser =>{
            if(firebaseUser){
                console.log(firebaseUser);
            } else {
                console.log('not logged in');
            }
          });
          
          btnLogout.addEventListener('click', e => {
             firebase.auth().signOut();
             
          });
          const preObject = document.getElementById('object');
          const ulList = document.getElementById('list');
          
          
          //create references
          const dbRefObject = firebase.database().ref().child('object');
          const dbRefList = dbRefObject.child('hobbies');
          //Sync object changes
          
          dbRefObject.on('value', snap => console.log(snap.val()));
          /*dbRefObject.on('value', snap => {
            const stringado = JSON.stringify(snap.val(), null, 3); 
            const atributo = JSON.parse(stringado);
            preObject.innerText = atributo["favNumber"];
          });*/
    
          dbRefObject.on('value', snap => {
            preObject.innerText = snap.val()["name"];
          });
          
          //Sync list changes
          dbRefList.on('child_added', snap => {
            const li = document.createElement('li');
            li.innerText = snap.val();
            li.id = snap.key;
            ulList.appendChild(li);
          });
          
          dbRefList.on('child_changed', snap =>{
              const liChanged = document.getElementById(snap.key);
              liChanged.innerText = snap.val();
              
          });
          
          dbRefList.on('child_removed', snap =>{
              const liToRemove = document.getElementById(snap.key);
              liToRemove.remove();
              
          })
          
          function writeUserData(userId, name, email) {
            firebase.database().ref('users/' + userId).set({
            username: name,
            email: email,
            });
          }
          
          
}());


var cajaNombre = document.getElementById('txtNombre');
var cajaRaza = document.getElementById('txtRaza');

function writeDogData(){
    var nombre = cajaNombre.value;
    var race = cajaRaza.value;
    firebase.database().ref('dogs/').push({
        username: nombre,
        raza: race,
    });
}


function pruebaOnce() {
firebase.database().ref('/dogs/' + '3').once('value').then(function(snapshot){
    console.log(snapshot.val().username);
    console.log(snapshot.val().raza);
    cajaNombre.value = snapshot.val().username;
    cajaRaza.value = snapshot.val().raza;    
});
}
function obtener_usuario(){
    var user = firebase.auth().currentUser;
    console.log(user.uid);
    if (user) {
     console.log('conseguido');
    } else {
      console.log('no conseguido');
    }
}
function remover_perro(){
    var perros = firebase.database().ref('/dogs/');
    
}



var storageRef = firebase.storage().ref();

var camera = document.getElementById('camera');
  var frame = document.getElementById('frame');

  camera.addEventListener('change', function(e) {
    var file = e.target.files[0]; 
    // Do something with the image file.
    frame.src = URL.createObjectURL(file);
    subirImagen(file);
  });
  
  function subirImagen(file){   
    console.log("Llegado a subir imagen");
    var uploadTask = storageRef.child("pepe.jpg").put(file); 
}

//Descarga de imagen
var starsRef = storageRef.child('pepe.jpg');

function descargarImagen(){


// Get the download URL
starsRef.getDownloadURL().then(function(url) {
  // Insert url into an <img> tag to "download"
     console.log("entramos en funcion");
     console.log("Esto es la url:" +url);
     document.getElementById('descarga').src = url;

}).catch(function(error) {
  switch (error.code) {
    case 'storage/object_not_found':
      // File doesn't exist
      break;

    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    

    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      break;
  }
});

}