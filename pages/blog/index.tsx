import style from 'styles/BlogPage.module.css'
import WaveAnimation from 'components/WaveAnimation'
import Article from 'components/Article'
import { blogs } from 'blogs'

export default function Blog() {
    return (
        <div className={style.container}>
            <WaveAnimation />
            <h1 className={style.title}>Blog</h1>
            <div className={style.subSection}>
                {blogs.map((blog) => (
                    <div className={style.articleContainer} key={blog.slug}>
                        <Article data={blog} />
                    </div>
                ))}
            </div>
        </div>
    )
}
