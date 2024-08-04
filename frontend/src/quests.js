import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import '../node_modules/swiper/swiper-bundle.min.css';
import '../node_modules/swiper/swiper.min.css';
import './css/quests/quests.css';
import searchIcon from './assets/quests/images/searchIcon.png';
import BNBChain from './assets/quests/images/BNBChain.png';
import Polygonchain from './assets/quests/images/Polygonchain.png';
import SolanaChain from './assets/quests/images/SolanaChain.png';
import OPChain from './assets/quests/images/OPChain.png';
import ArbitrumChain from './assets/quests/images/ArbitrumChain.png';
import ZebraChain from './assets/quests/images/ZebraChain.png';
import AvalancheChain from './assets/quests/images/AvalancheChain.png';
import VillagerChain from './assets/quests/images/VillagerChain.png';
import ScroolChain from './assets/quests/images/ScrollChain.png';
import QredoChain from './assets/quests/images/QredoChain.png';
import image1 from './assets/quests/images/quest_pic_big.png';
import image2 from './assets/quests/images/quest_pic_big.png';
import image3 from './assets/quests/images/quest_pic_big.png';
import arrowNext from '../src/assets/quests/images/arrow_next.png'

// ========================= Состояния и методы =========================

class Quests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            selectedStatus: null,
            selectedChains: [],
            isFixed: false, // Добавлено состояние для отслеживания фиксации
        };
        this.questFilterRef = React.createRef(); // Ссылка на элемент .quest-filter-container
    }

        // Функция для обработки прокрутки
    handleScroll = () => {
        const filterContainer = this.questFilterRef.current;
        const filterRect = filterContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
    
        if (filterRect.bottom > viewportHeight - 50) {
            this.setState({ isFixed: true });
        } else {
            this.setState({ isFixed: false });
        }
    };
    
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleInputChange = (event) => {
        this.setState({ query: event.target.value });
    };

    handleSearch = () => {
        console.log('Search query:', this.state.query);
        // Логика обработки поиска
    };

    swiperRef = null;

    handlePrev = () => {
        if (this.swiperRef && this.swiperRef.swiper) {
            this.swiperRef.swiper.slidePrev(3); // Листает на 3 слайда назад
        }
    };

    handleNext = () => {
        if (this.swiperRef && this.swiperRef.swiper) {
            this.swiperRef.swiper.slideNext(3); // Листает на 3 слайда вперед
        }
    };

     // Обработчик для выбора статуса
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

    // Обработчик для выбора цепи
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

    // ========================= Рендеринг =========================

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
                    // pagination={{ clickable: true }}
                    grabCursor={true}
                    className='mySwiper'
                >
                    <SwiperSlide>{this.renderSlide(image1, "Image 1")}</SwiperSlide>
                    <SwiperSlide>{this.renderSlide(image2, "Image 2")}</SwiperSlide>
                    <SwiperSlide>{this.renderSlide(image3, "Image 3")}</SwiperSlide>
                    {/* Добавьте больше слайдов по необходимости */}
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
                {/* Sort By */}
                <div className="sort-by">
                    <label htmlFor="sortSelect">Sort by</label>
                    <select id="sortSelect">
                        <option value="lastAdded">Last Added</option>
                        <option value="expiringDate">Expiring Date</option>
                        {/* Другие опции можно добавить здесь */}
                    </select>
                </div>
            
                {/* Status */}
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
            
                {/* Chain */}
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

                        {/* Добавьте другие элементы здесь */}
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
                    <img src={arrowNext} alt={arrowNext} />
                </div>
            </a>
        );
    }

    renderContent() {
        return (
            <div className='quests-content'>
                <div className="content-section-text">
                    <p>New</p>
                </div>
                <div className="carousel-container">
                    <Swiper
                        ref={(node) => { this.swiperRef = node; }}
                        modules={[Navigation, Pagination, Autoplay]}
                        slidesPerView={3}
                        spaceBetween={0}
                        navigation
                        loop={false}
                        autoplay={false}
                        className="mySwiperNewQuests"
                    >
                        <SwiperSlide>
                            <div className="quest-card">
                                <img src={image1} alt="Quest 1" />
                                <p>Stablecoin Yields on Optimism</p>
                                <p>7 tasks | 508 exp</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="quest-card">
                                <img src={image2} alt="Quest 2" />
                                <p>Stablecoin Yields on Optimism</p>
                                <p>7 tasks | 508 exp</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="quest-card">
                                <img src={image3} alt="Quest 3" />
                                <p>Stablecoin Yields on Optimism</p>
                                <p>7 tasks | 508 exp</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="quest-card">
                                <img src={image1} alt="Quest 1" />
                                <p>Stablecoin Yields on Optimism</p>
                                <p>7 tasks | 508 exp</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="quest-card">
                                <img src={image2} alt="Quest 2" />
                                <p>Stablecoin Yields on Optimism</p>
                                <p>7 tasks | 508 exp</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="quest-card">
                                <img src={image3} alt="Quest 3" />
                                <p>Stablecoin Yields on Optimism</p>
                                <p>7 tasks | 508 exp</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="quest-card">
                                <img src={image1} alt="Quest 1" />
                                <p>Stablecoin Yields on Optimism</p>
                                <p>7 tasks | 508 exp</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="quest-card">
                                <img src={image2} alt="Quest 2" />
                                <p>Stablecoin Yields on Optimism</p>
                                <p>7 tasks | 508 exp</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="quest-card">
                                <img src={image3} alt="Quest 3" />
                                <p>Stablecoin Yields on Optimism</p>
                                <p>7 tasks | 508 exp</p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            
        );
    }


    render() {
        const { isFixed } = this.state;
        return (
            <div className='quests-page'>
                {this.renderSearchBar()}
                {this.renderWelcomeBanner()}
                <div className="main-part-of-quest-page">
                    <div className="quest-cards-container">
                        {this.renderContent()}
                    </div>
                    <div className={`quest-filter-container ${isFixed ? 'fixed' : ''}`}
                        ref={this.questFilterRef}>
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
