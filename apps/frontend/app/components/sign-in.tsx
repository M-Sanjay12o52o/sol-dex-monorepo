import { signIn } from "../../auth";

export default function SignIn() {
    return (
        <div>
            <form action={async () => {
                "use server"
                await signIn("google")
            }}>
                <button
                    className="cursor-pointer"
                    type="submit">
                    Signin with Google
                </button>
            </form>
            <form
                action={async () => {
                    "use server"
                    await signIn("github")
                }}
            >
                <button
                    className="cursor-pointer"
                    type="submit"
                >
                    Signin with GitHub
                </button>
            </form>
        </div>
    )
}