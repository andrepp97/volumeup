import { getSession } from 'next-auth/react'
import Sidebar from '../components/sidebar'
import Main from '../components/main'
import Player from '../components/player'

export async function getServerSideProps(context) {
    const session = await getSession(context)

    return {
        props: { session }
    }
}

const Home = () => {
    return (
        <div className='bg-slate-900 h-screen overflow-hidden'>

            <main className='flex'>
                <Sidebar />
                <Main />
            </main>

            <div className='sticky bottom-0'>
                <Player />
            </div>

        </div>
    )
}

export default Home