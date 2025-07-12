'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogList from './Components/BlogList';

const initialBlogs = [
  {
    slug: 'nobitas-dinosaur-2006',
    title: "Nobita's Dinosaur 2006",
    image: "/images/nobitas-dinosaur.jpg",
    summary: "Nobita hatches a dinosaur and sets off on a heartwarming adventure to return it to its time."
  },
  {
    slug: 'stand-by-me-doraemon',
    title: "Stand By Me Doraemon",
    image: "/images/stand-by-me.jpg",
    summary: "A 3D retelling of Doraemon's mission to help Nobita find confidence and love."
  },
  {
    slug: 'nobitas-little-star-wars',
    title: "Nobita's Little Star Wars",
    image: "/images/little-star-wars.jpg",
    summary: "Nobita and friends help tiny alien rebels in an interstellar war of justice."
  },
  {
    slug: 'great-adventure-into-the-underworld',
    title: "New Great Adventure into the Underworld",
    image: "/images/underworld.jpg",
    summary: "A magical quest to save the underworld from an evil invasion."
  },
  {
    slug: 'nobita-and-the-steel-troops',
    title: "Nobita and the Steel Troops",
    image: "/images/steel-troops.jpg",
    summary: "Robots from another world threaten Earth, and Nobita must stop them."
  },
  {
    slug: 'kingdom-of-clouds',
    title: "Kingdom of Clouds",
    image: "/images/kingdom-of-clouds.jpg",
    summary: "A sky-high journey into a world above the clouds, filled with secrets and wonder."
  },
  {
    slug: 'secret-gadget-museum',
    title: "Secret Gadget Museum",
    image: "/images/secret-gadget-museum.jpg",
    summary: "Doraemon’s gadgets are stolen, sparking a mystery adventure in a futuristic museum."
  },
  {
    slug: 'legend-of-the-sun-king',
    title: "Legend of the Sun King",
    image: "/images/sun-king.jpg",
    summary: "Nobita is mistaken for a prince in an ancient kingdom with a mysterious curse."
  },
  {
    slug: 'great-adventure-in-the-antarctic',
    title: "Great Adventure in the Antarctic",
    image: "/images/antarctica.jpg",
    summary: "A chilling expedition into Antarctica unveils ancient secrets and hidden threats."
  },
  {
    slug: 'birth-of-japan',
    title: "Birth of Japan",
    image: "/images/birth-of-japan.jpg",
    summary: "Nobita and friends travel to the origins of Japan in this cultural time-travel epic."
  },
  {
    slug: 'nobita-and-the-windmasters',
    title: "Nobita and the Windmasters",
    image: "/images/windmasters.jpg",
    summary: "The gang enters a world ruled by wind spirits and faces off against an ancient evil."
  },
  {
    slug: 'drifts-in-the-universe',
    title: "Drifts in the Universe",
    image: "/images/universe-drift.jpg",
    summary: "A space adventure where Nobita and team drift into the unknown corners of the universe."
  }
];

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [blogs, setBlogs] = useState(initialBlogs);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    slug: '',
    image: '',
    summary: ''
  });

  useEffect(() => {
    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      localStorage.setItem('blogs', JSON.stringify(initialBlogs));
    }

    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setIsLoggedIn(true);
      setUserType(user);
    }
  }, []);

  const handleLogin = () => {
    router.push('/Login');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setUserType('');
    setSelectedMovies([]);
    setShowAddForm(false);
  };

  const handleAddMovie = () => {
    setShowAddForm(true);
  };

  const handleDeleteMovies = () => {
    if (selectedMovies.length === 0) {
      alert('Please select at least one movie to delete');
      return;
    }

    const updatedBlogs = blogs.filter(blog => !selectedMovies.includes(blog.slug));
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    setSelectedMovies([]);
  };

  const handleMovieSelect = (slug) => {
    setSelectedMovies(prev => 
      prev.includes(slug) 
        ? prev.filter(s => s !== slug) 
        : [...prev, slug]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitMovie = (e) => {
    e.preventDefault();
    
    if (!newMovie.title || !newMovie.slug || !newMovie.image || !newMovie.summary) {
      alert('Please fill in all fields');
      return;
    }

    const slugExists = blogs.some(blog => blog.slug === newMovie.slug);
    if (slugExists) {
      alert('A movie with this slug already exists');
      return;
    }

    const updatedBlogs = [...blogs, newMovie];
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    setNewMovie({
      title: '',
      slug: '',
      image: '',
      summary: ''
    });
    setShowAddForm(false);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-buttons">
          {isLoggedIn ? (
            <>
              <button className="nav-button logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <div className="log-buttons">
              <button className="nav-button" onClick={() => handleLogin('admin')}>Admin Login</button>
              <button className="nav-button" onClick={() => handleLogin('user')}>User Login</button>
            </div>
          )}
        </div>

        <h1>Doraemon Movie Blog</h1>
        <p>Explore timeless adventures with Nobita, Doraemon, and friends</p>
      </div>

      {isLoggedIn && (
        <div className="movie-controls">
          <button className="control-button add-movie" onClick={handleAddMovie}>
            <span>+</span> Add New Movie
          </button>
          <button className="control-button delete-movie" onClick={handleDeleteMovies}>
            <span>🗑️</span> Delete Selected
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="movie-form">
          <h2>Add New Movie</h2>
          <form onSubmit={handleSubmitMovie}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newMovie.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Slug (URL identifier):</label>
              <input
                type="text"
                name="slug"
                value={newMovie.slug}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={newMovie.image}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Summary:</label>
              <textarea
                name="summary"
                value={newMovie.summary}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="nav-button logout-button"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="nav-button">
                Save Movie
              </button>
            </div>
          </form>
        </div>
      )}

      <BlogList 
        blogs={blogs} 
        isLoggedIn={isLoggedIn}
        selectedMovies={selectedMovies}
        onMovieSelect={handleMovieSelect}
      />
    </div>
  );
}