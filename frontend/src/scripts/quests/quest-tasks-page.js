import React, { Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import { Link } from 'react-router-dom';
import '../node_modules/swiper/swiper-bundle.min.css';
import '../node_modules/swiper/swiper.min.css';
import './css/quests/quest-tasks-page.css';
//Services pics
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
//Company cards pics
import company1CardPic from './assets/quests/company-pics/company-1-card-pic.png'
import company2CardPic from './assets/quests/company-pics/company-2-card-pic.png'
import company3CardPic from './assets/quests/company-pics/company-3-card-pic.png'
import company4CardPic from './assets/quests/company-pics/company-4-card-pic.png'
import company5CardPic from './assets/quests/company-pics/company-5-card-pic.png'
import company6CardPic from './assets/quests/company-pics/company-6-card-pic.png'
SwiperCore.use([Navigation, Pagination]);

class QuestTasksPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
    }

    render() {
        return (
            <div className='quest-tasks-page'>
                <p>Ghbdtn vbh</p>
            </div>
        );
    }
}

export default Quests;
