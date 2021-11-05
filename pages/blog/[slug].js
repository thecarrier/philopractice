import Head from "next/head";
import { useRouter } from "next/router";
import {
  sanityClient,
  urlFor,
  usePreivewSubscription,
  PortableText,
} from "../../lib/sanity";

const articleQuery = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    body,
    slug,
    mainImage,
    publishedAt
}`;

export default function Article({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { post } = data;

  return (
    <div>
      <Head>
        <title>{post.title} - Zoran Kojčić</title>
      </Head>

      <article className="content">
        <div className="featured-image">
          <img src={urlFor(post.mainImage).url()} />
        </div>

        <h1>{post.title}</h1>

        <div className="entry">
          <PortableText blocks={post.body} />
        </div>
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)]{
            "params": {
                "slug": slug.current
            }
        }`
  );

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const post = await sanityClient.fetch(articleQuery, { slug });

  return { props: { data: { post } } };
}
