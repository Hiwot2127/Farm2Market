import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../lib/firebase";
import { store } from "../lib/store";
import Container from "../ui/Container";
import Registration from "../ui/Registration";
import UserInfo from "../ui/UserInfo";
import Loading from "../ui/Loading";
import Product from "./Product";

const Profile = () => {
  const { currentUser, getUserInfo, isLoading } = store();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      getUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [getUserInfo]);
  return (
    <Container>
      {currentUser ? (
  <div className="flex">
    <div className="bg-[#004437] text-white p-6 w-64 h-screen">
      <UserInfo currentUser={currentUser} />
    </div>
    <div className="flex-1 p-6">
      <Product />
    </div>
  </div>
) : (
  <Registration />
)}

      {isLoading && <Loading />}
    </Container>
  );
};

export default Profile;
