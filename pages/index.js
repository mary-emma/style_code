import Image from 'next/image'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { PostCard, Categories, PostWidget } from '../components'
import { getPosts } from "../services"

const inter = Inter({ subsets: ['latin'] })

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8" >
      <Head>
        <title>The Style Code</title>
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
        {posts.map((post) =>
          <PostCard post={post.node} key={post.title} />
        )}
        <div className="lg:col-span-1 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
      <div className="lg:col-span-1 col-span-1">
        <div className="lg:sticky relatve top-8">
        </div>
      </div>
    </div >
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [{ title: "hello" }];
  return {
    props: { posts }
  }
}