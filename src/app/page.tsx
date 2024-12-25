import { client } from '../sanity/lib/client';
import Image from 'next/image';
import hero from '../../public/hero.webp'
import BlogPost from '../components/BlogPost'
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Footer from '@/components/Footer'


export default async function Home() {
  // const query = `*[_type == "event"]`
  const events = await client.fetch(`*[_type == "event"]`);

  return (
    <div>


<Hero/>

<About/>

<BlogPost/>

    </div>
  );
}
