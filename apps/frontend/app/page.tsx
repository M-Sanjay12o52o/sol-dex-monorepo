// import { SignOut } from "@components/auth/server/signout-button";
import { SignOut } from "@components/auth/client/signout-button"
import SignIn from "@components/auth/server/signin-button";
import UserAvatar from "@components/UserAvatar";
import { useSession, signOut } from "next-auth/react";
import { auth } from "../auth"

export default async function Home() {
  // const session = useSession();
  const session = await auth();
  console.log("next-auth/react session: ", session);

  return (
    <div>
      {
        !session ? (
          <SignIn />
        ) : (
          <>
            <UserAvatar />
            <h1>Hello World</h1>
            {/* <SignOut /> */}
            <SignOut />
            {/* <button>
              Sign Out button from next-auth/react
            </button> */}
          </>
        )
      }
    </div>
  );
}
