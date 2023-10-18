import { db } from "./firebaseConfig.js";
import { collection, getDocs, getDoc, addDoc,query, updateDoc, deleteDoc, doc,orderBy} from "firebase/firestore";
const userCollection = collection(db,"User");
class UserService{
addUser(user){
return addDoc(userCollection,user);    
}
deleteUser(id){
 const user = doc(db,"User",id);   
 return deleteDoc(user);   
}
updateUser(id,newData){
 console.log({id})
 const user = doc(db,"User",id);   
 return updateDoc(user,newData);   
}
getUser(id){
const user = doc(db,"User",id);
return getDoc(user);
}
getAllUsers(sortField="age",sortOption="asc"){
const docsQuery = query(userCollection,orderBy(sortField?sortField:"age","asc"));
return getDocs(docsQuery);   
}

}
export const user = new UserService(); 

