import '../styles/globals.scss'
import '../styles/sass/styles.scss'
import {ThemeContextProvider} from '../components/context/ThemeContext';

function MyApp({Component, pageProps}) {
    return (
        <ThemeContextProvider>
            <Component {...pageProps} />
        </ThemeContextProvider>
    );
}

export default MyApp
