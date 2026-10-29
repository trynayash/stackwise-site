/**
 * Re-mounts on every navigation, so each page settles into place. Pure CSS (see .page-enter in globals.css),
 * so content is never hidden waiting for JavaScript.
 */
export default function Template({ children }: { children: React.ReactNode }) {
    return <div className="page-enter">{children}</div>;
}
