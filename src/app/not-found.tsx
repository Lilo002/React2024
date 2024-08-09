'use client';

import Link from 'next/link';
import image from '../../public/error.png';
import Image from 'next/image';

export default function ErrorPage() {
  return (
    <div className="error" data-testid="error">
      <h1>Oops, we've lost...</h1>
      <Link href="/">return to the main page</Link>
      <Image className="error-img" width={300} height={300} src={image.src} alt="error" />
    </div>
  );
}
