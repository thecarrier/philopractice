import Head from "next/head";
//import Image from 'next/image'
import Link from "next/link";
import { sanityClient, urlFor, PortableText } from "../lib/sanity";

const blogListQuery = `*[_type == 'post'] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  "categories": categories[]->title
}`;

export default function Home({ posts }) {
  return (
    
    <div>
     
      <Head>
        <title>Zoran Kojčić - Filozofska praksa</title>
      </Head>

      <div className="blog-list">
        {posts?.length > 0 &&
          posts.map((post) => (
            <Link href={`/blog/${post.slug.current}`} key={post._id}>
              <div className="article-block">
                <div className="img-col">
                  <img src={urlFor(post.mainImage).url()} />
                </div>

                <div className="txt-col">
                  <h3>{post.title}</h3>
                  <span className="list-cat-title"><i className="fas fa-book-open"></i> {post.categories}</span>
                  <PortableText blocks={post.excerpt} />
                  <Link href={`/blog/${post.slug.current}`}>
                    <a>Pročitaj više</a>
                  </Link>
                  {/*new Date(post.publishedAt).toDateString()*/}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await sanityClient.fetch(blogListQuery);

  return { 
    props: { 
      posts
    },
    revalidate: 10,
  };
};
