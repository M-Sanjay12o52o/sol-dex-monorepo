import { SignOut } from "@components/auth/signout-button";
import SignIn from "@components/auth/signin-button";
import UserAvatar from "@components/UserAvatar";
import { auth } from "auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      {
        !session ? (
          <SignIn />
        ) : (
          <>
            <UserAvatar />
            <h1>Hello World</h1>
            <SignOut />
          </>
        )
      }
    </div>
  );
}
