// // pages/posts/[slug].ts

import React from 'react'
import Image from 'next/image'
import { client } from '@/sanity/lib/client';
import CommentSection from '@/components/Comment';



export default async function blogDetail({params:{slug}}: {params:{slug:string}} ) {
    const queryPost = `*[_type == "blogPost" && slug.current == '${slug}'][0]{
      title,
      body,
      "author": author,
      _createdAt,
      "imageUrl": image.asset->url
    }`;
  
    const post = await client.fetch(queryPost);



    return(
      <div className='my-16'>
        
        <div className="px-4 sm:px-12 lg:px-28 p-6">
       <h1 className="text-3xl font-bold text-center mb-8">{post.title}</h1>
       <p className="text-sm text-gray-500 mb-2">
         Published on: {new Date(post._createdAt).toLocaleDateString()}
     </p>
      <p className="text-sm text-gray-600 mb-4">By: {post.author}</p>
       <div className="mb-6 my-7">
         <Image
          src={post.imageUrl}
          alt={post.title}
          width={500}
          height={500}
          className="w-full h-64 sm:h-80 object-cover rounded-lg mb-4"
        />
      </div>
      <div className="mb-4">
        {/* Render the body content, assuming it's an array of blocks */}
        {post.body.map((block:any, index:any) => (
          <p key={index}>{block.children[0]?.text}</p>
        ))}
      </div>
    </div>

    <CommentSection/>
      </div>
    )
}



























// import { client } from '../../../sanity/lib/client';
// import { useRouter } from 'next/router';
// import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

// interface Post {
//   title: string;
//   body: Array<any>;
//   author: string;
//   _createdAt: string;
//   imageUrl: string;
// }

// interface Params {
//   slug: string;
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   // Fetch all slugs for blog posts
//   const query = `*[_type == "blogPost"]{
//     "slug": slug.current
//   }`;
//   const posts = await client.fetch(query);

//   // Generate paths for each blog post
//   const paths = posts.map((post: { slug: string }) => ({
//     params: { slug: post.slug },
//   }));

//   return {
//     paths,
//     fallback: false, // Will show 404 for non-existing pages
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { slug } = params as unknown as Params;

//   // Fetch the data for a specific post based on the slug
//   const query = `*[_type == "blogPost" && slug.current == $slug][0]{
//     title,
//     body,
//     "author": author,
//     _createdAt,
//     "imageUrl": image.asset->url
//   }`;
//   const post = await client.fetch(query, { slug });

//   return {
//     props: { post },
//   };
// };

// const PostDetail: NextPage<{ post: Post }> = ({ post }) => {
//   const router = useRouter();

//   if (router.isFallback) {
//     return <div>Loading...</div>; // Show loading state while the page is being built
//   }

//   return (
//     <div className="px-4 sm:px-12 lg:px-28 p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">{post.title}</h1>
//       <p className="text-sm text-gray-500 mb-2">
//         Published on: {new Date(post._createdAt).toLocaleDateString()}
//       </p>
//       <p className="text-sm text-gray-600 mb-4">By: {post.author}</p>
//       <div className="mb-6">
//         <img
//           src={post.imageUrl}
//           alt={post.title}
//           className="w-full h-64 object-cover rounded-lg mb-4"
//         />
//       </div>
//       <div className="text-gray-700 mb-4">
//         {/* Render the body content, assuming it's an array of blocks */}
//         {post.body.map((block, index) => (
//           <p key={index}>{block.children[0]?.text}</p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PostDetail;
