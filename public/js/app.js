
import { auth, onAuthStateChanged ,signOut,doc,getDoc ,db} from "./firebase.js";
  // let name=document.getElementById("name");
  let email=document.getElementById("email");
 
onAuthStateChanged(auth,async (user) => {
  if (user) {
    const docRef = doc(db, "users", user.uid);//docRef means reference of documents
    const docSnap = await getDoc(docRef);//docSnap means data of documents
    console.log("doc",docSnap.data())
    if(docSnap.data()){
      console.log(user)
      if(location.pathname!=="/welcome.html"){
        window.location="/welcome.html"
      } 
      email.innerHTML =" Welcome "+ user.email
      console.log("login")
    }



  } else {
    console.log("not login")
    if(location.pathname !== "/login.html" && location.pathname !== "/register.html"){

      window.location="/login.html"

    }

  }
});

const logOut=()=>{
  signOut(auth).then(() => {
   console.log("signOut successfull")
   window.location="\login.html"
  }).catch((error) => {
    console.log("error...." ,error)
  });
}
 let logOutBtn = document.getElementById("logout");
logOutBtn && logOutBtn.addEventListener("click",logOut)
 



  

    
   
