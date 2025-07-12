'use client';

export default function BlogError({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong loading this blog!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}