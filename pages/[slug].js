import Head from "next/head";
import { useRouter } from "next/router";
import {
  sanityClient,
  urlFor,
  usePreivewSubscription,
  PortableText,
} from "../lib/sanity";

const pageQuery = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    body,
    slug,
    mainImage,
}`;

export default function Article({ data }) {

  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }


  const { page } = data;

  return (
    <div>
        <Head>
            <title>{page.title} - Zoran Kojčić</title>
        </Head>

        <article className="content">
        <div className="featured-image">
            <img src={urlFor(page.mainImage).url()} />
        </div>

        <h1>{page.title}</h1>

        <div className="entry">
            <PortableText blocks={page.body} />
        </div>
        </article>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "page" && defined(slug.current)]{
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
  const page = await sanityClient.fetch(pageQuery, { slug });

  return { props: { data: { page } } };
}
