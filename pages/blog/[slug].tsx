import style from 'styles/Blog.module.css'
import { blogs } from 'blogs'
import Image from 'next/image'
import WaveAnimation from 'components/WaveAnimation'

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

export default function Blog(props: props) {
    return (
        <div className={style.wraper}>
            <WaveAnimation />
            <div className={style.container}>
                <div className={style.imageContainer}>
                    <Image src={props.data.imageUrl} layout="fill" />
                </div>
                <div className={style.contentCard}>
                    <h3 className={style.date}>{props.data.date}</h3>
                    <h1 className={style.title}>{props.data.title}</h1>
                    <h2 className={style.description}>
                        {props.data.description}
                    </h2>
                    <div
                        className={style.content}
                        dangerouslySetInnerHTML={{ __html: props.data.content }}
                    />
                </div>
            </div>
        </div>
    )
}

export async function getStaticProps(context) {
    const { slug } = context.params
    const postData = blogs.find((post) => post.slug === slug)
    return {
        props: {
            data: postData,
        },
    }
}

export async function getStaticPaths() {
    const slugs = blogs.map((blog) => blog.slug)
    return {
        paths: slugs.map((postSlug) => ({
            params: {
                slug: postSlug,
            },
        })),
        fallback: false,
    }
}
