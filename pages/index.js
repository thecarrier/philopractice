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

/*
const blogCategoryQuery = `*[_type == 'category'] {
  _id,
  title
}`;
*/
/*
const mainNavigation = `*[_type == "siteConfig"]{
  mainNav[]->{ 
    _id,
    slug,
		title
  }
}`;
*/

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
                  <PortableText blocks={post.excerpt} />
                  <Link href={`/blog/${post.slug.current}`}>
                    <a>Pročitaj više</a>
                  </Link>
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
  //const category = await sanityClient.fetch(blogCategoryQuery);
  //const navigation = await sanityClient.fetch(mainNavigation);
  return { 
    props: { 
      posts
    },
    revalidate: 10,
  };
  //return { props: { category } };
}
