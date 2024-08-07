import React, { Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import '../node_modules/swiper/swiper-bundle.min.css';
import '../node_modules/swiper/swiper.min.css';
import './css/quests/quests.css';
import './css/quests/quests-main-part-quests-cards.css';
//Services pics
import searchIcon from './assets/quests/servicesPics/searchIcon.png';
import arrowNext from '../src/assets/quests/servicesPics/arrow_next.png';
import arrowBack from '../src/assets/quests/servicesPics/arrow_back.png';
//Chains pics
import BNBChain from './assets/quests/chainsPics/BNBChain.png';
import Polygonchain from './assets/quests/chainsPics/Polygonchain.png';
import SolanaChain from './assets/quests/chainsPics/SolanaChain.png';
import OPChain from './assets/quests/chainsPics/OPChain.png';
import ArbitrumChain from './assets/quests/chainsPics/ArbitrumChain.png';
import ZebraChain from './assets/quests/chainsPics/ZebraChain.png';
import AvalancheChain from './assets/quests/chainsPics/AvalancheChain.png';
import VillagerChain from './assets/quests/chainsPics/VillagerChain.png';
import ScroolChain from './assets/quests/chainsPics/ScrollChain.png';
import QredoChain from './assets/quests/chainsPics/QredoChain.png';
//Quests cards pics
import questCard1QuestPic from './assets/quests/questsCardsPics/questCard1QuestPic.png'
import questCard2QuestPic from '../src/assets/quests/questsCardsPics/questCard2QuestPic.png'
import questCard3QuestPic from '../src/assets/quests/questsCardsPics/questCard3QuestPic.png'
import questCard4QuestPic from '../src/assets/quests/questsCardsPics/questCard4QuestPic.png'
import questCard5QuestPic from '../src/assets/quests/questsCardsPics/questCard5QuestPic.png'
import questCard6QuestPic from '../src/assets/quests/questsCardsPics/questCard6QuestPic.png'

SwiperCore.use([Navigation, Pagination]);

class Quests extends Component {
    constructor(props) {
        super(props);
        this.swiperRef = React.createRef();
        this.swiperRefEcosystems = React.createRef();
        this.state = {
            query: '',
            selectedStatus: null,
            selectedChains: [],
        };
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevEcosystems = this.handlePrevEcosystems.bind(this);
        this.handleNextEcosystems = this.handleNextEcosystems.bind(this);
    }

    handlePrev() {
        if (this.swiperRef.current && this.swiperRef.current.swiper) {
            this.swiperRef.current.swiper.slidePrev();
        }
    }

    handleNext() {
        if (this.swiperRef.current && this.swiperRef.current.swiper) {
            this.swiperRef.current.swiper.slideNext();
        }
    }

    handlePrevEcosystems() {
        if (this.swiperRefEcosystems.current && this.swiperRefEcosystems.current.swiper) {
            this.swiperRefEcosystems.current.swiper.slidePrev();
        }
    }
    
    handleNextEcosystems() {
        if (this.swiperRefEcosystems.current && this.swiperRefEcosystems.current.swiper) {
            this.swiperRefEcosystems.current.swiper.slideNext();
        }
    }
    

    handleInputChange = (event) => {
        this.setState({ query: event.target.value });
    };

    handleSearch = () => {
        console.log('Search query:', this.state.query);
        // Логика обработки поиска
    };

    handleStatusClick = (status) => {
        const { selectedStatus } = this.state;
        if (selectedStatus === status) {
            // Если статус уже выбран, снять выбор
            this.setState({ selectedStatus: null });
        } else {
            // Если статус не выбран, установить его как текущий
            this.setState({ selectedStatus: status });
        }
    };

    handleChainClick = (chain) => {
        const { selectedChains } = this.state;
        if (selectedChains.includes(chain)) {
            // Если элемент уже выбран, удаляем его из массива
            this.setState({
                selectedChains: selectedChains.filter((selectedChain) => selectedChain !== chain),
            });
        } else {
            // Если элемент не выбран, добавляем его в массив
            this.setState({ selectedChains: [...selectedChains, chain] });
        }
    };

    renderSearchBar() {
        return (
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
        );
    }

    renderWelcomeBanner() {
        return (
            <div className='welcome-banner'>
                <div className='welcome-banner-text'>
                    <span>
                        <span className="earn-points-and-rewards-by-contributing-to-your-favourite-web-3-community-span">
                            Earn
                        </span>
                        <span className="earn-points-and-rewards-by-contributing-to-your-favourite-web-3-community-span2">
                            points
                            <br/>
                        </span>
                        <span className="earn-points-and-rewards-by-contributing-to-your-favourite-web-3-community-span3">
                            and
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
                    {this.renderChainLinks()}
                </div>
                {this.renderWelcomeBannerSlider()}
            </div>
        );
    }

    renderChainLinks() {
        return (
            <div className="chain-link-images">
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
        );
    }

    renderWelcomeBannerSlider() {
        return (
            <div className='welcome-banner-slider'>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    grabCursor={true}
                    className='mySwiper'
                >
                    <SwiperSlide>{this.renderSlide(questCard1QuestPic, "Image 1")}</SwiperSlide>
                    <SwiperSlide>{this.renderSlide(questCard2QuestPic, "Image 2")}</SwiperSlide>
                    <SwiperSlide>{this.renderSlide(questCard3QuestPic, "Image 3")}</SwiperSlide>
                </Swiper>
            </div>
        );
    }

    renderSlide(imageSrc, altText) {
        return (
            <div className='slide'>
                <a href="https://qredo.com" rel="noopener noreferrer" className='slide-img'>
                    <img src={imageSrc} alt={altText} />
                </a>
                <div className='quests-pic-name-company'>
                    <img src={QredoChain} alt='pic-project' />
                    <p>XRP Ledger</p>
                </div>
                <p className='quests-slide-text-name-quest'>XRP Ledger Universe - Earn Exclusive NFTs & Rewards - Phase 1</p>
            </div>
        );
    }

    renderSidebarFilters() {
        const { selectedStatus, selectedChains } = this.state;
        return (
            <div className="sidebarFilters">
                <div className="sort-by">
                    <label htmlFor="sortSelect">Sort by</label>
                    <select id="sortSelect">
                        <option value="lastAdded">Last Added</option>
                        <option value="expiringDate">Expiring Date</option>
                    </select>
                </div>
                <div className="status">
                    <label>Status</label>
                    <div
                        className={`status-tile ${selectedStatus === 'recommended' ? 'selected' : ''}`}
                        onClick={() => this.handleStatusClick('recommended')}
                    >
                        Recommended
                    </div>
                    <div
                        className={`status-tile ${selectedStatus === 'inProgress' ? 'selected' : ''}`}
                        onClick={() => this.handleStatusClick('inProgress')}
                    >
                        In Progress
                    </div>
                    <div
                        className={`status-tile ${selectedStatus === 'new' ? 'selected' : ''}`}
                        onClick={() => this.handleStatusClick('new')}
                    >
                        New
                    </div>
                </div>
                <div className="chain">
                    <label>Chain</label>
                    <div className="scroll-menu">
                        <div
                            className={`chain-tile ${selectedChains.includes('bnbChain') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('bnbChain')}
                        >
                            BNB Chain
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('opMainnet') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('opMainnet')}
                        >
                            OP Mainnet
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('scroll') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('scroll')}
                        >
                            Scroll
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('arbitrum') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('arbitrum')}
                        >
                            Arbitrum
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('arbitrum') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('arbitrum')}
                        >
                            Arbitrum
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('arbitrum') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('arbitrum')}
                        >
                            Arbitrum
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('arbitrum') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('arbitrum')}
                        >
                            Arbitrum
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('arbitrum') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('arbitrum')}
                        >
                            Arbitrum
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('arbitrum') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('arbitrum')}
                        >
                            Arbitrum
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('arbitrum') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('arbitrum')}
                        >
                            Arbitrum
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderSidebarProgressXP() {
        const expPoints = 65750; // Здесь можно использовать динамическое значение
        return (
            <a href="https://qredo.com" className="sidebarProgressXP">
                <div className="quest-pentagon-container">
                    <div className="quest-pentagon-white">
                        <div className="quest-pentagon-black">
                            <div className="quest-grade-number">1</div>
                        </div>
                    </div>
                </div>
                <div className='sidebarProgressXP-score-points'>
                    <div className='sidebarProgressXP-score-points-text'>
                        <p>Collected {expPoints} exp</p>
                        <p>Complete quests and get exp</p>
                    </div>
                </div>
                <div className='sidebarProgressXP-score-points-arrowNext'>
                    <img src={arrowNext} alt="Next" />
                </div>
            </a>
        );
    }

    renderContent() {
        const slidesData = [
            {
                mainLink: 'https://optimism.io',
                image: questCard1QuestPic,
                title: 'Stablecoin Yields on Optimism',
                tasks: '7 tasks',
                exp: '500 exp',
                companyLink: 'https://optimism.io',
                companyLogo: 'path/to/companyLogo1.jpg',
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
                companyLogo: 'path/to/companyLogo1.jpg',
                companyName: 'Aave',
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
                companyLogo: 'path/to/companyLogo1.jpg',
                companyName: 'Aave',
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
                companyLogo: 'path/to/companyLogo1.jpg',
                companyName: 'Aave',
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
                companyLogo: 'path/to/companyLogo1.jpg',
                companyName: 'Aave',
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
                companyLogo: 'path/to/companyLogo1.jpg',
                companyName: 'Aave',
                chainLink: 'https://scroll.io',
                chainLogo: ScroolChain,
            },
            //Add new clides
        ];
        
        const slides = slidesData.map((slide, index) => (
            <SwiperSlide key={index}>
                <div className="quests-card-quests">
                    <a href={slide.mainLink} rel="noopener noreferrer">
                        <img src={slide.image} alt={`Slide ${index} Image`} />
                        <div className="quests-card-quests-text">
                            <p>{slide.title}</p>
                        </div>
                        <div className="quests-card-quests-points-tasks">
                            <div className="quests-card-quests-points-tasks-inner">
                                <div className="quests-card-quests-tasks">
                                    <p>{slide.tasks}</p>
                                </div>
                                <div className="quests-card-quests-points"> 
                                    <p>{slide.exp}</p>
                                </div>
                            </div>
                        </div>
                        <div className='quests-card-quests-img-info'>
                            <a href={slide.companyLink} rel="noopener noreferrer">
                                <div className='quests-card-quests-img-info-company'>
                                    <img src={slide.companyLogo} alt={`${slide.companyName} Logo`} />
                                    <p>{slide.companyName}</p>
                                </div>
                            </a>
                            <a href={slide.chainLink} rel="noopener noreferrer">
                                <div className='quests-card-quests-img-info-chain'>
                                    <img src={slide.chainLogo} alt="Chain Logo Card" />
                                </div>
                            </a>
                        </div>
                    </a>
                </div>
            </SwiperSlide>
        ));

        const slides_ecosystems = Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide>
                <div className="quests-card-quests-ecosystems">
                    <a href="https://qredo.com" rel="noopener noreferrer">
                            <img className="image-66" src={BNBChain} alt="BNB Chain" />
                            <p className='quests-card-quests-ecosystems-name-chain'>BNB chain</p>
                            <p className='quests-card-quests-ecosystems-count-quests'>52 quests</p>
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
                    <div className="custom-button-prev" onClick={this.handlePrev}>
                        <img src={arrowBack} alt="Back" />
                    </div>
                    <div className="swiper-container">
                        <Swiper
                            ref={this.swiperRef}
                            spaceBetween={91}
                            slidesPerView={3}
                        >
                            {slides}
                        </Swiper>
                    </div>
                    <div className="custom-button-next" onClick={this.handleNext}>
                        <img src={arrowNext} alt="Next" />
                    </div>
                </div>
                <div className="content-section-text-ecosystems">
                    <p>Ecosystems</p>
                </div>
                <div className='content-section-slider-ecosystems'>
                    <div className="custom-button-prev-ecosystems" onClick={this.handlePrevEcosystems}>
                        <img src={arrowBack} alt="Back" />
                    </div>
                    <div className="swiper-container-ecosystems">
                        <Swiper
                            ref={this.swiperRefEcosystems}
                            spaceBetween={15}
                            slidesPerView={5}
                        >
                            {slides_ecosystems}
                        </Swiper>
                    </div>
                    <div className="custom-button-next-ecosystems" onClick={this.handleNextEcosystems}>
                        <img src={arrowNext} alt="Next" />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className='quests-page'>
                {this.renderSearchBar()}
                {this.renderWelcomeBanner()}
                <div className="main-part-of-quest-page">
                    {this.renderContent()}
                    <div className='quest-filter-container'>
                        {this.renderSidebarFilters()}
                        <p className='MyProgressLabel'>My Progress</p>
                        {this.renderSidebarProgressXP()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Quests;
