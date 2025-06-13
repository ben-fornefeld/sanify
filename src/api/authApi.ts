import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firebaseAuth, firestore } from "./firebase";
import UserValidator, { User } from "@/models/validators/User";
import {
  User as FirebaseUser,
  updateEmail as updateFirebaseEmail,
} from "firebase/auth";
import store from "@/app/store";

const fetchAppUser = async (user: FirebaseUser): Promise<User> => {
  const userDoc = await getDoc(doc(firestore, `users/${user.uid}`));

  return UserValidator.parse({
    ...userDoc.data(),
    profile_image_url: user.photoURL ?? undefined,
  });
};

const updateEmail = async (email: string): Promise<void> => {
  if (!firebaseAuth.currentUser) return;

  await updateFirebaseEmail(firebaseAuth.currentUser, email);
};

const updateFirestoreUser = async (user: User): Promise<void> => {
  await updateDoc(doc(firestore, `users/${user.uid}`), user);
};

const authApi = {
  fetchAppUser,
  updateFirestoreUser,
  updateEmail,
};

export default authApi;
