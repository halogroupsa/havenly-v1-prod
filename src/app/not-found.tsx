import { Arrow } from "@/components/interactive";

export default function NotFound() {
  return (
    <main id="main" className="container prose">
      <p className="eyebrow muted">404 · PAGE NOT FOUND</p>
      <h1>A little out of place.</h1>
      <p>
        The page you’re looking for isn’t here. Let’s take you back to our
        spaces.
      </p>
      <a className="button button-dark" href="/">
        Back to home <Arrow />
      </a>
    </main>
  );
}
