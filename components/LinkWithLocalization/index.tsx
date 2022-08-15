import { useRouter, NextRouter } from 'next/router'
import Link from 'next/link'
import { ReactChild } from 'react'

type Props = {
    href: string
    children: JSX.Element
}

export default function LinkWithLocalization(props: Props) {
    const router: NextRouter = useRouter()
    const { locale } = router
    return (
        <Link href={props.href} locale={locale}>
            {props.children}
        </Link>
    )
}
