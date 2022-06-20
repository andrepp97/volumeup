import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { ChevronDownIcon, ChevronUpIcon, LogoutIcon } from '@heroicons/react/outline'

const UserProfile = () => {
    // Hooks & State
    const { data: session } = useSession()
    const [open, setOpen] = useState(false)

    // Render
    return (
        <header className='absolute top-4 right-5 z-10'>

            <div
                onClick={() => setOpen(prev => !prev)}
                className='flex items-center rounded-full shadow shadow-stone-600 cursor-pointer space-x-3 p-1 pr-2 bg-slate-900 hover:opacity-90'
            >
                {session && (
                    <img
                        className='rounded-full w-8 h-8'
                        src={session?.user.image}
                        alt='Profile'
                    />
                )}
                <h2>
                    {session?.user.name}
                </h2>
                {
                    open
                        ? <ChevronUpIcon className='h-4 w-4' />
                        : <ChevronDownIcon className='h-4 w-4' />
                }
            </div>

            {open && (
                <div className='flex items-center rounded-md p-2 mt-1 bg-slate-900 text-gray-200'>
                    <button
                        onClick={() => {
                            signOut()
                            setOpen(false)
                        }}
                        className='flex items-center justify-end w-full space-x-2 p-2 rounded hover:text-white hover:bg-slate-700'
                    >
                        <LogoutIcon className='w-5 h-5' />
                        <p>Logout</p>
                    </button>
                </div>
            )}

        </header>
    );
}

export default UserProfile;