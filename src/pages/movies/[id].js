import { useRouter } from 'next/router';
import Image from 'next/image'; // Import the Image component
import Link from 'next/link';   // Import Link for navigation

// This object should contain details for ALL 13 movies,
// including their image paths (matching the public/images folder)
const movieDetails = {
  1: {
    title: "Inception",
    description: "A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    image: "/images/inception.jpeg"
  },
  2: {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    image: "/images/interstellar.jpeg"
  },
  3: {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    image: "/images/dark-knight.jpeg"
  },
  4: {
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    image: "/images/pulp-fiction.jpeg"
  },
  5: {
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    image: "/images/forrest-gump.jpeg"
  },
  6: {
    title: "The Matrix",
    description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is an elaborate deception of an evil cyber-intelligence.",
    image: "/images/the-matrix.jpeg"
  },
  7: {
    title: "Goodfellas",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
    image: "/images/goodfellas.jpeg"
  },
  8: {
    title: "Fight Club",
    description: "An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more.",
    image: "/images/fight-club.jpeg" // Changed to .jpeg for consistency
  },
  9: {
    title: "Spirited Away",
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    image: "/images/spirited-away.jpeg" // Changed to .jpeg for consistency
  },
  10: {
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    image: "/images/parasite.jpeg"
  },
  11: {
    title: "Whiplash",
    description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    image: "/images/whiplash.jpeg"
  },
  12: {
    title: "La La Land",
    description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    image: "/images/la-la-land.jpeg"
  }
};

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Check if router is ready (i.e., id is available)
  if (!router.isReady) {
    return <p className="loading-message">Loading movie details...</p>; // Added class
  }

  // Get the movie details using the id
  const movie = movieDetails[id];

  // If movie is not found after router is ready
  if (!movie) {
    return (
      <main className="main"> {/* Removed detail-page-main */}
        <h1 className="title">Movie Not Found</h1>
        <p className="description">The movie you are looking for does not exist.</p>
        <Link href="/">
          <p className="back-to-gallery-link"> {/* Added specific class for this link */}
            Back to Gallery
          </p>
        </Link>
      </main>
    );
  }

  return (
    <main className="main"> {/* Removed detail-page-main */}
      <h1 className="title">{movie.title}</h1>
      <div className="movie-detail-content"> {/* Wrapper for image and description */}
        {movie.image && (
          <Image
            src={movie.image}
            alt={movie.title}
            width={300} // Adjust width as per your design
            height={450} // Adjust height as per your design (maintain aspect ratio)
            className="movie-detail-img" // Add a class for styling
          />
        )}
        <p className="description">{movie.description}</p>
      </div>
      <Link href="/">
        <p className="back-to-gallery-link"> {/* Added specific class for this link */}
          Back to Gallery
        </p>
      </Link>
    </main>
  );
}