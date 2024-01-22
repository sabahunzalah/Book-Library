
import { auth, onAuthStateChanged, signOut, doc, getDoc, db, getDocs, collection, addDoc, onSnapshot } from "./firebase.js";
// let name=document.getElementById("name");
let email = document.getElementById("email");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, "users", user.uid);//docRef means reference of documents
    const docSnap = await getDoc(docRef);//docSnap means data of documents
    console.log("doc", docSnap.data())//it gives you data in readable formate
    if (docSnap.data()) {
      console.log(user)
      if (location.pathname !== "/welcome.html") {
        window.location = "/welcome.html"
      }
      email.innerHTML = " Welcome " + user.email
      console.log("login")
    }

  } else {
    console.log("not login")
    if (location.pathname !== "/login.html" && location.pathname !== "/register.html") {

      window.location = "/login.html"

    }

  }
});



//logout button
const logOut = () => {
  signOut(auth).then(() => {
    console.log("signOut successfull")
    window.location = "\login.html"
  }).catch((error) => {
    console.log("error....", error)
  });
}
let logOutBtn = document.getElementById("logout");
logOutBtn && logOutBtn.addEventListener("click", logOut)


let getAllUsers = async () => {
  const q = collection(db, "users");
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    console.log("hello");
  });
}
getAllUsers()






let addBook = async () => {
  // let img = document.getElementById("image")
  let title = document.getElementById("title")
  let price = document.getElementById("price")
  let publisher = document.getElementById("publisher")
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "books"), {
    title: title.value,
    price: price.value,
    publisher: publisher.value

  });
  console.log("Document written with ID: ", docRef.id);

}
let addBookBtn = document.getElementById("addBookBtn")
addBookBtn.addEventListener('click', addBook)

let addAllBooks = async () => {
  const ref = collection(db, 'books');
  let cardsContainer = document.getElementById("cardsContainer");
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("cardParent");
  cardsContainer.appendChild(cardDiv);
  
  const unsubscribe = onSnapshot(ref, (querySnapshot) => {
    cardDiv.innerHTML = "";
    querySnapshot.forEach((doc) => {
      let bookInfoDiv = document.createElement("div");
      bookInfoDiv.classList.add("bookInfo");

      // Title
      let titleLabel = document.createElement("label");
      titleLabel.classList.add("titleLabel");
      titleLabel.textContent = "Your Book Title:";
      bookInfoDiv.appendChild(titleLabel);

      let titleDoc = document.createElement("p");
      titleDoc.classList.add("titleDoc");
      titleDoc.textContent = doc.data().title;
      bookInfoDiv.appendChild(titleDoc);

      // Price
      let priceLabel = document.createElement("label");
      priceLabel.classList.add("priceLabel");
      priceLabel.textContent = "Your Book Price:";
      bookInfoDiv.appendChild(priceLabel);

      let price = document.createElement("p");
      price.classList.add("price");
      price.textContent = doc.data().price;
      bookInfoDiv.appendChild(price);

      // Publisher
      let publisherLabel = document.createElement("label");
      publisherLabel.classList.add("publisherLabel");
      publisherLabel.textContent = "Publisher Name:";
      bookInfoDiv.appendChild(publisherLabel);

      let publisher = document.createElement("p");
      publisher.classList.add("publisher");
      publisher.textContent = doc.data().publisher;
      bookInfoDiv.appendChild(publisher);

      cardDiv.appendChild(bookInfoDiv);
    });
  });
};
addAllBooks();


// let addAllBooks = async () => {
//   const ref = collection(db, 'books');
//   let cardsContainer = document.getElementById("cardsContainer");
//   let cardDiv = document.createElement("div");
//   cardDiv.classList.add("card");
//   cardsContainer.appendChild(cardDiv)
//   const unsubscribe = onSnapshot(ref, (querySnapshot) => {
//     cardDiv.innerHTML = "";
//     querySnapshot.forEach((doc) => {
//       cardDiv.innerHTML += `
//     <div class="bookInfo">
//         <label class="titleLabel">Title:</label>
//         <p class="titleDoc">${doc.data().title}</p>

//         <label class="priceLabel">Price:</label>
//         <p class="price">${doc.data().price}</p>

//         <label class="publisherLabel">Publisher:</label>
//         <p class="publisher">${doc.data().publisher}</p>
//     </div>`;
//     });



//   });
// };
// addAllBooks()










