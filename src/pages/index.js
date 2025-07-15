import Link from 'next/link';
import Image from 'next/image';

const movies = [
  { id: 1, title: "Inception", image: "/images/inception.jpeg" },
  { id: 2, title: "Interstellar", image: "/images/interstellar.jpeg" },
  { id: 3, title: "The Dark Knight", image: "/images/dark-knight.jpeg" },
  { id: 4, title: "Pulp Fiction", image: "/images/pulp-fiction.jpeg" },
  { id: 5, title: "Forrest Gump", image: "/images/forrest-gump.jpeg" },
  { id: 6, title: "The Matrix", image: "/images/the-matrix.jpeg" },
  { id: 7, title: "Goodfellas", image: "/images/goodfellas.jpeg" },
  { id: 8, title: "Fight Club", image: "/images/fight-club.jpg" },
  { id: 9, title: "Spirited Away", image: "/images/spirited-away.jpg" },
  { id: 10, title: "Parasite", image: "/images/parasite.jpeg" },
  { id: 11, title: "Whiplash", image: "/images/whiplash.jpeg" },
  { id: 12, title: "La La Land", image: "/images/la-la-land.jpeg" },
];

export default function Home() {
  return (
    <main className="main">
      <h1 className="title">Movie Gallery</h1>
      <div className="grid">
        {movies.map(movie => (
          <Link href={`/movies/${movie.id}`} key={movie.id} className="card">
            {/* The Image component now uses layout="fill" */}
            <div className="card-image-container"> {/* New wrapper div */}
              <Image
                src={movie.image}
                alt={movie.title}
                layout="fill"      
                objectFit="cover"   
                
              />
            </div>
            <h2>{movie.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}