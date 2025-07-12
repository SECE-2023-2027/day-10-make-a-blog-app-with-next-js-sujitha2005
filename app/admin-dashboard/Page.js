'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../globals.css';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    slug: '',
    image: '',
    summary: '',
    content: ''
  });
  const [viewBlog, setViewBlog] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user !== 'admin') {
      alert('Access denied. Admins only.');
      router.push('/Login');
      return;
    }

    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
  }, []);

  const handleAdd = () => {
    const { title, slug, image, summary, content } = newBlog;
    if (!title || !slug || !image || !summary || !content) return;

    const updatedBlogs = [...blogs, newBlog];
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    setNewBlog({ title: '', slug: '', image: '', summary: '', content: '' });
  };

  const handleDelete = (slug) => {
    const updatedBlogs = blogs.filter((blog) => blog.slug !== slug);
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    if (viewBlog?.slug === slug) setViewBlog(null);
  };

  const handleView = (blog) => {
    setViewBlog(blog);
  };

  const handleChange = (e, field) => {
    setNewBlog({ ...newBlog, [field]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    router.push('/Login');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <Link href="/createblog" className="create-btn">➕ Create Blog</Link>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Image</th>
            <th>Summary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.slug}>
              <td>{blog.title}</td>
              <td>{blog.slug}</td>
              <td><img src={blog.image} alt="thumbnail" width="80" /></td>
              <td>{blog.summary}</td>
              <td>
                <div className="action-buttons">
                <Link href={`/updateblogs?slug=${blog.slug}`} className="edit-btn">Edit</Link>

                  <button onClick={() => handleDelete(blog.slug)} className="delete-btn">Delete</button>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                value={newBlog.title}
                onChange={(e) => handleChange(e, 'title')}
                placeholder="Title"
              />
            </td>
            <td>
              <input
                type="text"
                value={newBlog.slug}
                onChange={(e) => handleChange(e, 'slug')}
                placeholder="Slug"
              />
            </td>
            <td>
              <input
                type="text"
                value={newBlog.image}
                onChange={(e) => handleChange(e, 'image')}
                placeholder="Image URL"
              />
            </td>
            <td>
              <input
                type="text"
                value={newBlog.summary}
                onChange={(e) => handleChange(e, 'summary')}
                placeholder="Summary"
              />
              <input
                type="text"
                value={newBlog.content}
                onChange={(e) => handleChange(e, 'content')}
                placeholder="Content"
              />
            </td>
            <td>
              <button className="add-btn" onClick={handleAdd}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>

      {viewBlog && (
        <div className="blog-card admin-preview">
          <img src={viewBlog.image} alt={viewBlog.title} />
          <div className="card-content">
            <h3>{viewBlog.title}</h3>
            <p><strong>Summary:</strong> {viewBlog.summary}</p>
            <p><strong>Content:</strong> {viewBlog.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}