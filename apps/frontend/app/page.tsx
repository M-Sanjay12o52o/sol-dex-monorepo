import { auth } from "../auth"
import Header from "@components/Navbar";
import LandingPage from "@components/LandingPage";

export default async function Home() {
  const session = await auth();
  console.log("next-auth/react session: ", session);
  console.log("session?.user?.email: ", session?.user?.email);

  return (
    <div>
      {
        !session ? (
          <>
            <LandingPage />
          </>
        ) : (
          <>
            <div>Hello world</div>
          </>
        )
      }
    </div>
  );
}
