'use client';
import Link from 'next/link';

export default function BlogList({ blogs, isLoggedIn, selectedMovies, onMovieSelect }) {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div key={blog.slug} className="blog-card-wrapper">
          {isLoggedIn && (
            <input
              type="checkbox"
              checked={selectedMovies.includes(blog.slug)}
              onChange={() => onMovieSelect(blog.slug)}
              className="movie-checkbox"
            />
          )}
          <Link href={`/blog/${encodeURIComponent(blog.slug)}`} className="blog-card">
            <div className="card-content">
              <img src={blog.image} alt={blog.title} />
              <h3>{blog.title}</h3>
              <p>{blog.summary}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}