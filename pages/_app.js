import '../styles/globals.scss'
import {ThemeContextProvider} from '../context/ThemeContext';

function MyApp({Component, pageProps}) {
    return (
        // <SafeHydrate>
            <ThemeContextProvider>
                <Component {...pageProps} />
            </ThemeContextProvider>
        // </SafeHydrate>
    );
}

export default MyApp
