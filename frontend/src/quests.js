import React, { Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import userAPI from "./scripts/user-auth/user-api";
import '../node_modules/swiper/swiper-bundle.min.css';
import '../node_modules/swiper/swiper.min.css';
import './css/quests/quests.css';
import './css/quests/quests-main-part-quests-cards.css';
//Services pics
import searchIcon from './assets/quests/services-pics/search-icon.png';
import arrow from './assets/quests/services-pics/arrow.png';
//Chains pics
import BNBChain from './assets/quests/chains-pics/bnb-chain.png';
import Polygonchain from './assets/quests/chains-pics/polygon-chain.png';
import SolanaChain from './assets/quests/chains-pics/solana-chain.png';
import OPChain from './assets/quests/chains-pics/op-chain.png';
import ArbitrumChain from './assets/quests/chains-pics/arbitrum-chain.png';
import ZebraChain from './assets/quests/chains-pics/zebra-chain.png';
import AvalancheChain from './assets/quests/chains-pics/avalanche-chain.png';
import VillagerChain from './assets/quests/chains-pics/villager-chain.png';
import ScroolChain from './assets/quests/chains-pics/scroll-chain.png';
import QredoChain from './assets/quests/chains-pics/qredo-chain.png';
//Quests cards pics
import questCard1QuestPic from './assets/quests/quests-cards-pics/quest-card-1-quest-pic.jpg'
import questCard2QuestPic from './assets/quests/quests-cards-pics/quest-card-2-quest-pic.jpg'
import questCard3QuestPic from './assets/quests/quests-cards-pics/quest-card-3-quest-pic.jpg'
import questCard4QuestPic from './assets/quests/quests-cards-pics/quest-card-4-quest-pic.jpg'
import questCard5QuestPic from './assets/quests/quests-cards-pics/quest-card-5-quest-pic.jpg'
import questCard6QuestPic from './assets/quests/quests-cards-pics/quest-card-6-quest-pic.jpg'
//Company cards pics
import company1CardPic from './assets/quests/company-pics/company-1-card-pic.png'
import company2CardPic from './assets/quests/company-pics/company-2-card-pic.png'
import company3CardPic from './assets/quests/company-pics/company-3-card-pic.png'
import company4CardPic from './assets/quests/company-pics/company-4-card-pic.png'
import company5CardPic from './assets/quests/company-pics/company-5-card-pic.png'
import company6CardPic from './assets/quests/company-pics/company-6-card-pic.png'
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
            isPrevButtonDisabled: true,
            isNextButtonDisabled: false,
            isPrevButtonEcosystemsDisabled: true,
            isNextButtonEcosystemsDisabled: false,
            userAccount: null
        };
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevEcosystems = this.handlePrevEcosystems.bind(this);
        this.handleNextEcosystems = this.handleNextEcosystems.bind(this);
    }

    async componentDidMount() {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            const userAccount = await userAPI.getUser(accessToken);
            this.setState({ userAccount });
        }
    }

    updateButtonStates(swiper) {
        if (swiper.isBeginning) {
            this.setState({ isPrevButtonDisabled: true });
        } else {
            this.setState({ isPrevButtonDisabled: false });
        }
        if (swiper.isEnd) {
            this.setState({ isNextButtonDisabled: true });
        } else {
            this.setState({ isNextButtonDisabled: false });
        }
    }

    updateButtonStatesEcosystems(swiper) {
        if (swiper.isBeginning) {
            this.setState({ isPrevButtonEcosystemsDisabled: true });
        } else {
            this.setState({ isPrevButtonEcosystemsDisabled: false });
        }
        if (swiper.isEnd) {
            this.setState({ isNextButtonEcosystemsDisabled: true });
        } else {
            this.setState({ isNextButtonEcosystemsDisabled: false });
        }
    }

    handlePrev() {
        if (this.swiperRef.current && this.swiperRef.current.swiper) {
            this.swiperRef.current.swiper.slidePrev();
            this.updateButtonStates(this.swiperRef.current.swiper);
        }
    }
    
    handleNext() {
        if (this.swiperRef.current && this.swiperRef.current.swiper) {
            this.swiperRef.current.swiper.slideNext();
            this.updateButtonStates(this.swiperRef.current.swiper);
        }
    }
    
    handlePrevEcosystems() {
        if (this.swiperRefEcosystems.current && this.swiperRefEcosystems.current.swiper) {
            this.swiperRefEcosystems.current.swiper.slidePrev();
            this.updateButtonStatesEcosystems(this.swiperRefEcosystems.current.swiper);
        }
    }
    
    handleNextEcosystems() {
        if (this.swiperRefEcosystems.current && this.swiperRefEcosystems.current.swiper) {
            this.swiperRefEcosystems.current.swiper.slideNext();
            this.updateButtonStatesEcosystems(this.swiperRefEcosystems.current.swiper);
        }
    }

    handleSwiperSlideChange = (swiper) => {
        this.updateButtonStates(swiper);
    }
    
    handleSwiperSlideChangeEcosystems = (swiper) => {
        this.updateButtonStatesEcosystems(swiper);
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
        const slideDataWelcomeBanner = [
            {
                imageSrc: questCard1QuestPic,
                altText: "Image 1",
                title: "XRP Ledger Universe - Earn Exclusive NFTs & Rewards - Phase 1",
                companyName: "XRP Ledger",
                companyLogo: company1CardPic,
                link: "https://qredo.com"
            },
            {
                imageSrc: questCard2QuestPic,
                altText: "Image 2",
                title: "Ethereum Quest - Unlock Unique Tokens and Rewards",
                companyName: "Ethereum",
                companyLogo: company2CardPic,
                link: "https://ethereum.org"
            },
            {
                imageSrc: questCard3QuestPic,
                altText: "Image 3",
                title: "Polkadot Journey - Earn Staking Rewards",
                companyName: "Polkadot",
                companyLogo: company3CardPic,
                link: "https://polkadot.network"
            }
        ];
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
                    {slideDataWelcomeBanner.map((slide, index) => (
                        <SwiperSlide key={index}>
                            {this.renderSlide(
                                slide.imageSrc,
                                slide.altText,
                                slide.title,
                                slide.companyName,
                                slide.companyLogo,
                                slide.link
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        );
    }

    renderSlide(imageSrc, altText, title, companyName, companyLogo, link) {
        return (
            <div className='slide'>
                <a href={link} rel="noopener noreferrer" className='slide-img'>
                    <img src={imageSrc} alt={altText} />
                </a>
                <div className='quests-pic-name-company'>
                    <img src={companyLogo} alt='pic-project' />
                    <p>{companyName}</p>
                </div>
                <p className='quests-slide-text-name-quest'>{title}</p>
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
                            className={`chain-tile ${selectedChains.includes('avax') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('avax')}
                        >
                            Avalanche
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('Polygon') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('Polygon')}
                        >
                            Polygon
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('Qredo') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('Qredo')}
                        >
                            Qredo
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('Solana') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('Solana')}
                        >
                            Solana
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('Villager') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('Villager')}
                        >
                            Villager
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('Zebra') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('Zebra')}
                        >
                            Zebra
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderSidebarProgressXP() {
        const { userAccount } = this.state
        if (userAccount) {
            const expPoints = userAccount['experience'];
            return (
                <Link to="/profile" className="sidebarProgressXP">
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
                        <img src={arrow} alt="Next" />
                    </div>
                </Link>
            );
        }
    }

    renderContent() {
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
                    <div className={`custom-button-prev ${this.state.isPrevButtonDisabled ? 'disabled' : ''}`}
                                    onClick={this.handlePrev}>
                        <img src={arrow} alt="Back" />
                    </div>
                    <div className="swiper-container">
                        <Swiper
                            ref={this.swiperRef}
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
                                // 1330: {
                                //     slidesPerView: 3,
                                //     spaceBetween: 20,
                                // },
                                1200: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                }
                                
                            }}
                            onSlideChange={this.handleSwiperSlideChange}
                        >
                            {slidesNewQuests}
                        </Swiper>
                    </div>
                    <div className={`custom-button-next ${this.state.isNextButtonDisabled ? 'disabled' : ''}`}
                                    onClick={this.handleNext}>
                        <img src={arrow} alt="Next" />
                    </div>
                </div>
                <div className="content-section-text-ecosystems">
                    <p>Ecosystems</p>
                </div>
                <div className='content-section-slider-ecosystems'>
                    <div className={`custom-button-prev-ecosystems ${this.state.isPrevButtonEcosystemsDisabled ? 'disabled' : ''}`}
                                    onClick={this.handlePrevEcosystems}>
                        <img src={arrow} alt="Back" />
                    </div>
                    <div className="swiper-container-ecosystems">
                        <Swiper
                            ref={this.swiperRefEcosystems}
                            spaceBetween={15}
                            slidesPerView={2}
                            breakpoints={{
                                1700 : {
                                    slidesPerView: 5,
                                    spaceBetween: 15,
                                },
                                1400: {
                                    slidesPerView: 5,
                                    spaceBetween: 25,
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
                            onSlideChange={this.handleSwiperSlideChangeEcosystems}
                        >
                            {slides_ecosystems}
                        </Swiper>
                    </div>
                    <div className={`custom-button-next-ecosystems ${this.state.isNextButtonEcosystemsDisabled ? 'disabled' : ''}`}
                                    onClick={this.handleNextEcosystems}>
                        <img src={arrow} alt="Next" />
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
                        {this.state.userAccount ? (<p className='MyProgressLabel'>My Progress</p>) : null}
                        {this.renderSidebarProgressXP()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Quests;
