import { db } from "./firebaseConfig.js";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";
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
getAllUsers(){
return getDocs(userCollection);   
}
} 

export const user = new UserService(); 
