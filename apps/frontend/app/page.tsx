import BasicLandingPage from "@/components/BasicLandingPage";
import { auth } from "../auth"
import LandingPage from "@/components/LandingPage";


export default async function Home() {
  const session = await auth();

  return (
    <div>
      {
        !session?.user ? (
          <>
            <LandingPage />
          </>
        ) : (
          <>
            <BasicLandingPage />
          </>
        )
      }
    </div >
  );
}
