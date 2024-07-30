import React from 'react';
import './css/quests.css'
import searchIcon from './assets/images/searchIcon.png'
import BNBChain from './assets/images/BNBChain.png'
import Polygonchain from './assets/images/Polygonchain.png'
import SolanaChain from './assets/images/SolanaChain.png'
import OPChain from './assets/images/OPChain.png'
import ArbitrumChain from './assets/images/ArbitrumChain.png'
import ZebraChain from './assets/images/ZebraChain.png'
import AvalancheChain from './assets/images/AvalancheChain.png'
import VillagerChain from './assets/images/VillagerChain.png'
import ScroolChain from './assets/images/ScroolChain.png'
import QredoChain from './assets/images/QredoChain.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../node_modules/swiper/swiper-bundle.min.css';
import '../node_modules/swiper/swiper.min.css';
import { Autoplay, Pagination } from 'swiper/modules';
import image1 from './assets/images/quest_pic.png'
import image2 from './assets/images/quest_pic.png'
import image3 from './assets/images/quest_pic.png'
import image4 from './assets/images/logo_small.png'
// SwiperCore.use([Autoplay]);

class Quests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };
    }

    handleInputChange = (event) => {
        this.setState({ query: event.target.value });
    };

    handleSearch = () => {
        console.log('Search query:', this.state.query);
        // Логика обработки поиска
    };

    render() {
        return (
            <div className='quests-page'>
                <div className="search-bar-area">
                    <div className='search-bar'>
                        <div className='frame-search-bar'>
                            <img src={searchIcon} alt="Search Icon" />
                        </div>
                        <input
                            type="text"
                            value={this.state.query}
                            onChange={this.handleInputChange}
                            placeholder="Search"
                        />
                    </div>
                </div>
                <div className='welcome-banner'>
                    <div className='welcome-banner-text'>
                        <div className="earn-points-and-rewards-by-contributing-to-your-favourite-web-3-community">
                            <span>
                                <span className="earn-points-and-rewards-by-contributing-to-your-favourite-web-3-community-span">
                                    Earn
                                </span>
                                <span className="earn-points-and-rewards-by-contributing-to-your-favourite-web-3-community-span2">
                                    points
                                </span>
                                <span className ="earn-points-and-rewards-by-contributing-to-your-favourite-web-3-community-span3">
                                    and
                                    <br/>
                                </span>
                                <span className="earn-points-and-rewards-by-contributing-to-your-favourite-web-3-community-span4">
                                    rewards
                                    <br/>
                                </span>
                                <span className="earn-points-and-rewards-by-contributing-to-your-favourite-web-3-community-span5">
                                    by Contributing to
                                    <br/>
                                    Your
                                    <br/>
                                    Favourite Web3
                                    <br/>
                                    Community
                                </span>
                            </span>
                        </div>
                        <a href="https://www.bnbchain.org" rel="noopener noreferrer">
                            <img className="image-66" src={BNBChain} alt="BNB Chain" />
                        </a>
                        <a href="https://polygon.technology" rel="noopener noreferrer">
                            <img className="image-67" src={Polygonchain} alt="Polygon Chain" />
                        </a>
                        <a href="https://solana.com" rel="noopener noreferrer">
                            <img className="image-68" src={SolanaChain} alt="Solana Chain" />
                        </a>
                        <a href="https://optimism.io" rel="noopener noreferrer">
                            <img className="image-69" src={OPChain} alt="OP Chain" />
                        </a>
                        <a href="https://arbitrum.io" rel="noopener noreferrer">
                            <img className="image-70" src={ArbitrumChain} alt="Arbitrum Chain" />
                        </a>
                        <a href="https://zebrachain.org" rel="noopener noreferrer">
                            <img className="image-71" src={ZebraChain} alt="Zebra Chain" />
                        </a>
                        <a href="https://avax.network" rel="noopener noreferrer">
                            <img className="image-72" src={AvalancheChain} alt="Avalanche Chain" />
                        </a>
                        <a href="https://villagerchain.com" rel="noopener noreferrer">
                            <img className="image-73" src={VillagerChain} alt="Villager Chain" />
                        </a>
                        <a href="https://scroll.io" rel="noopener noreferrer">
                            <img className="image-74" src={ScroolChain} alt="Scroll Chain" />
                        </a>
                        <a href="https://qredo.com" rel="noopener noreferrer">
                            <img className="image-75" src={QredoChain} alt="Qredo Chain" />
                        </a>
                    </div>
                    <div className='welcome-banner-slider'>
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                            }}
                            loop={true}
                            pagination={{ clickable: true }}
                            grabCursor={true}
                            className='mySwiper'
                        >
                            <SwiperSlide>
                            <div className='slide'>
                                <img src={image1} alt='Image 1' />
                                <p>XRP Ledger</p>
                                <p>XRP Ledger Universe - Earn Exclusive NFTs & Rewards - Phase 1</p>
                            </div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className='slide'>
                                <img src={image2} alt='Image 2' />
                                <p>XRP Ledger</p>
                                <p>XRP Ledger Universe - Earn Exclusive NFTs & Rewards - Phase 1</p>
                            </div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className='slide'>
                                <img src={image3} alt='Image 3' />
                                <p>XRP Ledger</p>
                                <p>XRP Ledger Universe - Earn Exclusive NFTs & Rewards - Phase 1</p>
                            </div>
                            </SwiperSlide>
                            {/* Добавьте больше слайдов по необходимости */}
                        </Swiper>
                    </div>
                </div>
            </div>
        );
    }
}

export default Quests;