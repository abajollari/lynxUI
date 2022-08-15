import style from './index.module.css'
import Image from 'next/image'
import Link from 'components/LinkWithLocalization'

type props = {
    data: {
        title: string
        imageUrl: string
        date: string
        slug: string
        description: string
        content: string
        refUrl: string
    }
}

export default function Article(props: props) {
    return (
        <div className={style.container}>
            <div className={style.imageContainer}>
                <Image
                    src={props.data.imageUrl}
                    width={1920}
                    height={1080}
                    layout="responsive"
                />
                <span className={style.date}>{props.data.date}</span>
            </div>
            <div className={style.content}>
                <h1 className={style.title}>{props.data.title}</h1>
                <h3 className={style.description}>{props.data.description}</h3>
            </div>
            <div className={style.linkContainer}>
                <Link href={`/blog/${props.data.slug}`}>
                    <span className={style.link}>Continue reading</span>
                </Link>
            </div>
        </div>
    )
}
