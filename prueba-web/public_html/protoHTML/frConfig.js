var config = {
            apiKey: "AIzaSyAuSjFHm2l6wBMdAtj-BTRor27Hnn_4Tns",
            authDomain: "prueba-web-630ea.firebaseapp.com",
            databaseURL: "https://prueba-web-630ea.firebaseio.com",
            projectId: "prueba-web-630ea",
            storageBucket: "",
            messagingSenderId: "322979248019"
          };
          firebase.initializeApp(config);

function desloguear(){
             firebase.auth().signOut().then(function() {
                console.log("logued out");
             }, function(error) {
                console.log("Error al desloguearse" +error );
             });
}    
