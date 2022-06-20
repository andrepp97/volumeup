import Image from 'next/image'
import { getProviders, signIn } from 'next-auth/react'
import { useState } from 'react'

export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: { providers }
    }
}

const Login = ({ providers }) => {
    // State
    const [loading, setLoading] = useState(false)

    // Function
    const onLogin = (provider) => {
        setLoading(true)
        signIn(provider.id, { callbackUrl: "/" })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    // Render
    return (
        <div className="flex items-center justify-center h-screen bg-gray-600">
            <div className="text-center w-fit rounded shadow-2xl space-y-8 p-8">
                <Image
                    src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png"
                    height={200}
                    width={200}
                    alt="Login"
                />
                {Object.values(providers).map((provider, index) => (
                    <div key={index}>
                        <button
                            disabled={loading}
                            onClick={() => onLogin(provider)}
                            className="bg-green-600 text-gray-100 rounded px-4 py-2 hover:bg-green-700 disabled:bg-green-900"
                        >
                            {loading ? "Logging In . . ." : `Login with ${provider.name}`}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Login;