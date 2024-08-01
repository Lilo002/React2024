import './_style.scss';

import image from '../../public/error.png';
import Image from 'next/image';
import { ThemeProvider } from '../components/themeProvider/themeProvider';
import { ErrorBoundary } from '../errorBoundary/ErrorBoundary';
import { wrapper } from '../store/store';

export function MyApp({ Component }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="error">
          <h1>Oops, we crashed...</h1>
          <Image className="error-img" src={image.src} alt="error" width={300} height={300} />
        </div>
      }
    >
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(MyApp);
