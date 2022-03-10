import HeaderComponent from '../components/header/HeaderComponent';
import FooterComponent from '../components/footer/FooterComponent';
import {ThemeContext} from '../context/ThemeContext';
import {useContext} from 'react';
// import HomeContainer from '../containers/home/HomeContainer';
import dynamic from 'next/dynamic';
// import HomeContainer from '../containers/home/HomeContainer';
const HomeContainer = dynamic(() => import('../containers/home/HomeContainer'), {ssr: false});

export default function Home() {
    const {theme} = useContext(ThemeContext)
    return (
        <div>
            <div className={`bg-${theme} tracking-wider border-box wrapper`}>
                <div>
                    {/*{!params.get("key") && <HeaderComponent/>}*/}
                    <HeaderComponent/>
                </div>
                <div>
                    {/*HomeContainer*/}
                    <HomeContainer/>
                </div>
                <div>
                    <FooterComponent/>
                </div>
            </div>
        </div>
    )
}
