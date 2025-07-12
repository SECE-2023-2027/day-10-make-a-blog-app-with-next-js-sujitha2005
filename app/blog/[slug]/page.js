'use client';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

const blogs = [
  {
    slug: 'nobitas-dinosaur-2006',
    title: "🦕 Nobita's Dinosaur 2006",
    image: "/images/nobitas-dinosaur.jpg",
    content: "Nobita hatches a dinosaur using Doraemon’s gadget and raises it with care, leading to an emotional journey to return it to its own time."
  },
  {
    slug: 'stand-by-me-doraemon',
    title: "👫 Stand By Me Doraemon",
    image: "/images/stand-by-me.jpg",
    content: "An emotional 3D animated retelling of Nobita and Doraemon’s bond, filled with nostalgia, life lessons, and heartfelt moments."
  },
  {
    slug: 'nobitas-little-star-wars',
    title: "🚀 Nobita's Little Star Wars",
    image: "/images/little-star-wars.jpg",
    content: "Nobita and friends join a miniature alien resistance to fight tyranny in outer space. A fun blend of action and sci-fi."
  },
  {
    slug: 'great-adventure-into-the-underworld',
    title: "🌌 New Great Adventure into the Underworld",
    image: "/images/underworld.jpg",
    content: "A magical journey beneath the earth where Nobita and the gang battle dark forces to save a hidden civilization."
  },
  {
    slug: 'nobita-and-the-steel-troops',
    title: "🤖 Nobita and the Steel Troops",
    image: "/images/steel-troops.jpg",
    content: "An epic battle with robotic invaders where Nobita and friends must defend Earth from a mechanical threat."
  },
  {
    slug: 'kingdom-of-clouds',
    title: "☁️ Kingdom of Clouds",
    image: "/images/kingdom-of-clouds.jpg",
    content: "Nobita discovers a secret world in the clouds, but peace is threatened by human interference. Can they protect this floating kingdom?"
  },
  {
    slug: 'secret-gadget-museum',
    title: "🔧 Secret Gadget Museum",
    image: "/images/secret-gadget-museum.jpg",
    content: "Doraemon’s gadgets are mysteriously stolen, leading to a thrilling mystery adventure inside the futuristic museum."
  },
  {
    slug: 'legend-of-the-sun-king',
    title: "🌞 Legend of the Sun King",
    image: "/images/sun-king.jpg",
    content: "Nobita finds himself in an ancient kingdom where he’s mistaken for royalty. A tale of destiny and courage unfolds."
  },
  {
    slug: 'great-adventure-in-the-antarctic',
    title: "❄️ Great Adventure in the Antarctic",
    image: "/images/antarctica.jpg",
    content: "Frozen secrets and buried civilizations await as Doraemon and team explore the icy wilderness of Antarctica."
  },
  {
    slug: 'birth-of-japan',
    title: "🏯 Birth of Japan",
    image: "/images/birth-of-japan.jpg",
    content: "Traveling to ancient times, the kids witness the formation of Japan and take part in shaping myths and legends."
  },
  {
    slug: 'nobita-and-the-windmasters',
    title: "🌬️ Nobita and the Windmasters",
    image: "/images/windmasters.jpg",
    content: "A whirlwind adventure into a mystical realm where wind spirits need Nobita’s help to restore balance."
  },
  {
    slug: 'drifts-in-the-universe',
    title: "🌠 Drifts in the Universe",
    image: "/images/universe-drift.jpg",
    content: "An out-of-this-world rescue mission as Nobita and friends drift into deep space and discover galactic wonders."
  }
];

export default function BlogDetails({ params }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve blogs from localStorage
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    
    // Find the blog with matching slug
    const foundBlog = storedBlogs.find(b => b.slug === params.slug);
    
    if (foundBlog) {
      setBlog(foundBlog);
    } else {
      notFound();
    }
    setLoading(false);
  }, [params.slug]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!blog) notFound();

  return (
    <div className="blog-details">
      <h1>{blog.title}</h1>
      <img src={blog.image} alt={blog.title} />
      <p>{blog.content || blog.summary}</p>
    </div>
  );
}