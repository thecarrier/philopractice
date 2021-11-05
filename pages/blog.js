import Head from "next/head";
//import Image from 'next/image'
import Link from "next/link";
import { sanityClient, urlFor, PortableText } from "../lib/sanity";

const blogListQuery = `*[_type == 'category'] {
  _id,
  title
}`;

/*
const mainNavigation = `*[_type == "siteConfig"]{
  mainNav[]->{ 
    _id,
    slug,
		title
  }
}`;
*/

export default function Home({ category }) {
  return (
    
    <div>
     
      <Head>
        <title>Zoran Kojčić - Filozofska praksa</title>
      </Head>

      <div className="blog-list">

      <h3>{category.title}</h3>
         
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const category = await sanityClient.fetch(blogListQuery);
  //const navigation = await sanityClient.fetch(mainNavigation);
  return { props: { category } };
  //return { props: { category } };
}
