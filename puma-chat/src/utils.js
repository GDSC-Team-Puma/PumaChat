import { getDatabase, ref, set } from "firebase/database";

function create_user(username) {
    if(username == ""){
        console.log("invalid username");
        return
    }
    const db = getDatabase();
    set(ref(db, 'users/' + username),{
        username: username
    });
    console.log("new user successfully created");

}




export{
    create_user 
};