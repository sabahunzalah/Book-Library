import{auth,createUserWithEmailAndPassword, doc, setDoc,db } from "./firebase.js"
const register=()=>{
    const emailId=document.getElementById("emailInp");
    const passwordId=document.getElementById("passwordInp");
    // alert(emailId.value,passwordId.value)
    createUserWithEmailAndPassword(auth, emailId.value, passwordId.value)
  .then((userCredential) => {
      const user = userCredential.user;
      console.log("user",user)
      addUserToFirestore(user)
      alert("User is regitered,login now")
      // window.location.href="/welcome.html"
  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Not singup sorry")
    console.log(errorMessage,errorCode)
  });

  }

  const signInBtn=document.getElementById("signInBtn")
  signInBtn.addEventListener("click",register)

  let addUserToFirestore = async(user)=>{
     const res = await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email:user.email,
      verify:user.emailVerified,

    });
    console.log(res)
    
  }