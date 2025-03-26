import ConnectDatabase from '@/components/ConnectDatabase'
import { FC } from 'react'

interface PageProps {

}

const Page: FC<PageProps> = ({ }) => {
    return <div>
        <ConnectDatabase />
    </div>
}

export default Page