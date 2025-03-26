"use client"

import IndexingPage from '@/components/Indexing'
import { FC } from 'react'

interface PageProps {

}

const Page: FC<PageProps> = ({ }) => {
    const handleSelect = () => {

    }

    return <div>
        <IndexingPage onSelect={handleSelect} />
    </div>
}

export default Page