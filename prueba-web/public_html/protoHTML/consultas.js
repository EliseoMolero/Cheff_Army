
function newPostForCurrentUser(title, text) {
var userId = firebase.auth().currentUser.uid;
return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot){
    var username = snapshot.val().username;
});

}

