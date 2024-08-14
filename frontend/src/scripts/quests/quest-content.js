import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';

//Services pics
import arrow from '../../assets/quests/services-pics/arrow.png';
//Chains pics
import BNBChain from '../../assets/quests/chains-pics/bnb-chain.png';
import Polygonchain from '../../assets/quests/chains-pics/polygon-chain.png';
import SolanaChain from '../../assets/quests/chains-pics/solana-chain.png';
import OPChain from '../../assets/quests/chains-pics/op-chain.png';
import ArbitrumChain from '../../assets/quests/chains-pics/arbitrum-chain.png';
import ZebraChain from '../../assets/quests/chains-pics/zebra-chain.png';
import AvalancheChain from '../../assets/quests/chains-pics/avalanche-chain.png';
import VillagerChain from '../../assets/quests/chains-pics/villager-chain.png';
import ScroolChain from '../../assets/quests/chains-pics/scroll-chain.png';
import QredoChain from '../../assets/quests/chains-pics/qredo-chain.png';
//Quests cards pics
import questCard1QuestPic from '../../assets/quests/quests-cards-pics/quest-card-1-quest-pic.jpg'
import questCard2QuestPic from '../../assets/quests/quests-cards-pics/quest-card-2-quest-pic.jpg'
import questCard3QuestPic from '../../assets/quests/quests-cards-pics/quest-card-3-quest-pic.jpg'
import questCard4QuestPic from '../../assets/quests/quests-cards-pics/quest-card-4-quest-pic.jpg'
import questCard5QuestPic from '../../assets/quests/quests-cards-pics/quest-card-5-quest-pic.jpg'
import questCard6QuestPic from '../../assets/quests/quests-cards-pics/quest-card-6-quest-pic.jpg'
//Company cards pics
import company1CardPic from '../../assets/quests/company-pics/company-1-card-pic.png'
import company2CardPic from '../../assets/quests/company-pics/company-2-card-pic.png'
import company3CardPic from '../../assets/quests/company-pics/company-3-card-pic.png'
import company4CardPic from '../../assets/quests/company-pics/company-4-card-pic.png'
import company5CardPic from '../../assets/quests/company-pics/company-5-card-pic.png'
import company6CardPic from '../../assets/quests/company-pics/company-6-card-pic.png'

SwiperCore.use([Navigation, Pagination]);


const renderContent = (props) => {
    const { handlePrev, handleNext, handlePrevEcosystems, handleNextEcosystems, swiperRef, swiperRefEcosystems, isPrevButtonDisabled, isNextButtonDisabled, isPrevButtonEcosystemsDisabled, isNextButtonEcosystemsDisabled, handleSwiperSlideChange, handleSwiperSlideChangeEcosystems  } = props;

    const slidesDataNewQuests = [
        {
            mainLink: '/quest-tasks-page',
            image: questCard1QuestPic,
            title: 'Stablecoin Yields on Optimism',
            tasks: '7 tasks',
            exp: '500 exp',
            companyLink: 'https://optimism.io',
            companyLogo: company1CardPic,
            companyName: 'Aave',
            chainLink: 'https://www.bnbchain.org',
            chainLogo: BNBChain,
        },
        {
            mainLink: 'https://qredo.com',
            image: questCard2QuestPic,
            title: 'Stablecoin Yields on Optimism',
            tasks: '7 tasks',
            exp: '500 exp',
            companyLink: 'https://optimism.io',
            companyLogo: company2CardPic,
            companyName: 'XSwap',
            chainLink: 'https://optimism.io',
            chainLogo: OPChain,
        },
        {
            mainLink: 'https://qredo.com',
            image: questCard3QuestPic,
            title: 'Stablecoin Yields on Optimism',
            tasks: '7 tasks',
            exp: '500 exp',
            companyLink: 'https://optimism.io',
            companyLogo: company3CardPic,
            companyName: 'Rubic',
            chainLink: 'https://zebrachain.org',
            chainLogo: ZebraChain,
        },
        {
            mainLink: 'https://qredo.com',
            image: questCard4QuestPic,
            title: 'Stablecoin Yields on Optimism',
            tasks: '7 tasks',
            exp: '500 exp',
            companyLink: 'https://optimism.io',
            companyLogo: company4CardPic,
            companyName: 'Celo',
            chainLink: 'https://qredo.com',
            chainLogo: QredoChain,
        },
        {
            mainLink: 'https://qredo.com',
            image: questCard5QuestPic,
            title: 'Stablecoin Yields on Optimism',
            tasks: '7 tasks',
            exp: '500 exp',
            companyLink: 'https://optimism.io',
            companyLogo: company5CardPic,
            companyName: 'Layer3',
            chainLink: 'https://avax.network',
            chainLogo: AvalancheChain,
        },
        {
            mainLink: 'https://qredo.com',
            image: questCard6QuestPic,
            title: 'Stablecoin Yields on Optimism',
            tasks: '7 tasks',
            exp: '500 exp',
            companyLink: 'https://optimism.io',
            companyLogo: company6CardPic,
            companyName: 'Across',
            chainLink: 'https://scroll.io',
            chainLogo: ScroolChain,
        },
        //Add new clides
    ];
    
    const slidesNewQuests = slidesDataNewQuests.map((slidesNewQuests, index) => (
        <SwiperSlide key={index}>
            <div className="quests-card-quests">
                <Link to={`/quest-tasks-page/${slidesNewQuests.id}`} rel="noopener noreferrer">
                    <img src={slidesNewQuests.image} alt={`Slide ${index} Image`} className='quests-card-quests-main-pic' />
                    <div className="quests-card-quests-text">
                        <p>{slidesNewQuests.title}</p>
                    </div>
                    <div className="quests-card-quests-points-tasks">
                        <div className="quests-card-quests-points-tasks-inner">
                            <div className="quests-card-quests-tasks">
                                <p>{slidesNewQuests.tasks}</p>
                            </div>
                            <div className="quests-card-quests-points"> 
                                <p>{slidesNewQuests.exp}</p>
                            </div>
                        </div>
                    </div>
                    <div className='quests-card-quests-img-info'>
                        <a href={slidesNewQuests.companyLink} rel="noopener noreferrer">
                            <div className='quests-card-quests-img-info-company'>
                                <img src={slidesNewQuests.companyLogo} alt={`${slidesNewQuests.companyName} Logo`} />
                                <p>{slidesNewQuests.companyName}</p>
                            </div>
                        </a>
                        <a href={slidesNewQuests.chainLink} rel="noopener noreferrer">
                            <div className='quests-card-quests-img-info-chain'>
                                <img src={slidesNewQuests.chainLogo} alt="Chain Logo Card" />
                            </div>
                        </a>
                    </div>
                </Link>
            </div>
        </SwiperSlide>
    ));

    const slidesDataEcosystems = [
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: BNBChain,
            chainName: 'BNB',
            countQuests: '52 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: ArbitrumChain,
            chainName: 'Arbitrum',
            countQuests: '20 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: AvalancheChain,
            chainName: 'Avax',
            countQuests: '34 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: OPChain,
            chainName: 'Optimism',
            countQuests: '5 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: Polygonchain,
            chainName: 'Polygon',
            countQuests: '26 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: QredoChain,
            chainName: 'Qredo',
            countQuests: '10 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: ScroolChain,
            chainName: 'Scroll',
            countQuests: '60 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: SolanaChain,
            chainName: 'Solana',
            countQuests: '78 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: VillagerChain,
            chainName: 'Villager',
            countQuests: '29 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: ZebraChain,
            chainName: 'Zebra',
            countQuests: '6 quests',
        },
    ];

    const slides_ecosystems = slidesDataEcosystems.map((slidesDataEcosystems, index) => (
        <SwiperSlide key={index}>
            <div className="quests-card-quests-ecosystems">
                <a href={slidesDataEcosystems.chainLink} rel="noopener noreferrer">
                    <img className="image-66" src={slidesDataEcosystems.chainLogo} alt="BNB Chain" />
                    <p className='quests-card-quests-ecosystems-name-chain'>{slidesDataEcosystems.chainName}</p>
                    <p className='quests-card-quests-ecosystems-count-quests'>{slidesDataEcosystems.countQuests}</p>
                </a>
            </div>
        </SwiperSlide>
    ));
    return (
        <div className='quests-content'>
            <div className="content-section-text">
                <p>New</p>
            </div>
            <div className='content-section-slider-new'>
                <div className={`custom-button-prev ${isPrevButtonDisabled ? 'disabled' : ''}`}
                                onClick={handlePrev}>
                    <img src={arrow} alt="Back" />
                </div>
                <div className="swiper-container">
                    <Swiper
                        ref={swiperRef}
                        slidesPerView= {1}
                        spaceBetween= {0}
                        breakpoints={{
                            1700 : {
                                slidesPerView: 3,
                                spaceBetween: 95,
                            },
                            1400 : {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1200: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 1,
                                spaceBetween: 0,
                            }
                            
                        }}
                        onSlideChange={handleSwiperSlideChange}
                    >
                        {slidesNewQuests}
                    </Swiper>
                </div>
                <div className={`custom-button-next ${isNextButtonDisabled ? 'disabled' : ''}`}
                                onClick={handleNext}>
                    <img src={arrow} alt="Next" />
                </div>
            </div>
            <div className="content-section-text-ecosystems">
                <p>Ecosystems</p>
            </div>
            <div className='content-section-slider-ecosystems'>
                <div className={`custom-button-prev-ecosystems ${isPrevButtonEcosystemsDisabled ? 'disabled' : ''}`}
                                onClick={handlePrevEcosystems}>
                    <img src={arrow} alt="Back" />
                </div>
                <div className="swiper-container-ecosystems">
                    <Swiper
                        ref={swiperRefEcosystems}
                        spaceBetween={15}
                        slidesPerView={2}
                        breakpoints={{
                            1700 : {
                                slidesPerView: 5,
                                spaceBetween: 15,
                            },
                            1400: {
                                slidesPerView: 5,
                                spaceBetween: 15,
                            },
                            1200: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 5,
                            }
                        }}
                        onSlideChange={handleSwiperSlideChangeEcosystems}
                    >
                        {slides_ecosystems}
                    </Swiper>
                </div>
                <div className={`custom-button-next-ecosystems ${isNextButtonEcosystemsDisabled ? 'disabled' : ''}`}
                                onClick={handleNextEcosystems}>
                    <img src={arrow} alt="Next" />
                </div>
            </div>
            <div className="content-section-text">
                <p>ANTI-TOKEN</p>
            </div>
            <div className='content-section-slider-new'>
                <div className={`custom-button-prev ${isPrevButtonDisabled ? 'disabled' : ''}`}
                                onClick={handlePrev}>
                    <img src={arrow} alt="Back" />
                </div>
                <div className="swiper-container">
                    <Swiper
                        ref={swiperRef}
                        slidesPerView= {1}
                        spaceBetween= {0}
                        breakpoints={{
                            1700 : {
                                slidesPerView: 3,
                                spaceBetween: 95,
                            },
                            1400 : {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1200: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 1,
                                spaceBetween: 0,
                            }
                            
                        }}
                        onSlideChange={handleSwiperSlideChange}
                    >
                        {slidesNewQuests}
                    </Swiper>
                </div>
                <div className={`custom-button-next ${isNextButtonDisabled ? 'disabled' : ''}`}
                                onClick={handleNext}>
                    <img src={arrow} alt="Next" />
                </div>
            </div>
        </div>
    );
};

export default renderContent;