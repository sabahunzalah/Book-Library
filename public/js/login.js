import{auth,signInWithEmailAndPassword,doc, setDoc,db} from "./firebase.js"
const signin=()=>{
    const emailId=document.getElementById("emailInp");
    const passwordId=document.getElementById("passwordInp");
    // alert(emailId.value,passwordId.value)
    signInWithEmailAndPassword(auth, emailId.value, passwordId.value)
    
  .then((userCredential) => {
   
      const user = userCredential.user;
      console.log("user",user)
      addUserToFirestore(user)
      // window.location.href="/welcome.html"
  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("first sign up")
    console.log(errorMessage,errorCode)
  });

  }

  let addUserToFirestore = async(user)=>{
    const res = await setDoc(doc(db, "users", user.uid), {
     name: user.displayName,
     email:user.email,
     verify:user.emailVerified,

    });
    console.log(res)
   
 }

  const signInBtn=document.getElementById("signInBtn")
  signInBtn.addEventListener("click",signin)
 