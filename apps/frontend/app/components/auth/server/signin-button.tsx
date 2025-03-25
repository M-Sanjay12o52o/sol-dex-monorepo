// import { useRouter } from "next/router";
import { signIn } from "../../../../auth";
import { Github, Globe } from "lucide-react";


export default function SignIn() {
    // const router = useRouter()

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                    Sign in to your account
                </h1>

                <form action={async () => {
                    "use server"
                    await signIn("google", { redirect: true });
                    // router.push("/");
                }}>
                    <button
                        type="submit"
                        className="flex items-center justify-center cursor-pointer w-full px-4 py-3 mb-4 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition text-gray-700 font-medium"
                    >
                        <Globe className="h-5 w-5 mr-2" />
                        Sign in with Google
                    </button>
                </form>

                <form action={async () => {
                    "use server"
                    await signIn("github", { redirect: true });
                    // router.push("/");
                }}>
                    <button
                        type="submit"
                        className="flex items-center justify-center cursor-pointer w-full px-4 py-3 border border-gray-800 rounded-md bg-black text-white hover:bg-gray-900 transition font-medium"
                    >
                        <Github className="h-5 w-5 mr-2" />
                        Sign in with GitHub
                    </button>
                </form>
            </div>
        </div>
    );
}
