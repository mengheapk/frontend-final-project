import { useEffect, useState } from 'react';
import { shareUrl } from '../../utils/share';
import styles from './ShareButton.module.css';

export default function ShareButton({ event }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);
  
  async function handleClick() {
    try {
      await navigator.clipboard.writeText(shareUrl(event));
      setError(false);
      setCopied(true);
    } catch {
      setError(true);
    }
  }

  return (
  <div className={styles.wrapper}>
    <button type="button" className="btn btn-primary" onClick={handleClick}>{copied ? 'Copied' : 'Share link'}</button>
    {error && <p className="field-error">Could not copy the link. Please try again.</p>}
    </div>
  );
}