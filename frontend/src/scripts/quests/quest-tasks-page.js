import React from 'react'; // useEffect и useState можно временно удалить, если они больше не используются
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import '../../css/quests/quest-tasks-page.css';
import SwiperCore from 'swiper';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

//Данные-заглушки
import leftSectionLogoCompanyTasks from '../../assets/quests/company-pics/company-1-card-pic.png'
import rightSectionLogoCompanyTasks from '../../assets/quests/company-pics/company-2-card-pic.png'

SwiperCore.use([Navigation, Pagination]);

const buttonData = [
    { text: 'Subscribe to X account' },
    { text: 'Swap on Base' },
    { text: 'Subscribe to X account' },
    { text: 'Claim Reward (500xp)' },
    { text: 'Claim Reward (500xp)' },
    { text: 'Claim Reward (500xp)' },
    { text: 'Claim Reward (500xp)' },
    { text: 'Claim Reward (500xp)' },
    { text: 'Claim Reward (500xp)' },
    { text: 'Claim Reward (500xp)' },
    { text: 'Claim Reward (500xp)' },
    { text: 'Claim Reward (500xp)' },
    { text: 'Claim Reward (500xp)' },
];

// Компонент для генерации кнопок
const QuestTasksButtons = () => {
    return (
        <div className='quest-tasks-page-left-section-buttons-container'>
            {buttonData.map((button, index) => (
                <div key={index} className='quest-tasks-page-left-section-buttons-container-button'>
                    <div className='quest-tasks-page-left-section-buttons-container-button-number'>
                        <p>{index + 1}</p>
                    </div>
                    <div className='quest-tasks-page-left-section-buttons-container-button-text'>
                        <p>{button.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const QuestTasksPage = () => {
    const { questId } = useParams();

    // Закомментированный код для загрузки данных
    // const [questData, setQuestData] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchQuestData = async (questId) => {
    //         try {
    //             const response = await fetch(`https://yourapi.com/quests/${questId}`);
    //             const data = await response.json();
    //             setQuestData(data);
    //         } catch (error) {
    //             setError(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchQuestData(questId);
    // }, [questId]);

    // Закомментированный условный рендеринг
    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error loading data</div>;
    // }

    //все элементы должны подгружаться из базы через questData.

    return (
        <div className='quest-tasks-page'>
            <section className='quest-tasks-page-left-section'>
                <div className='quest-tasks-page-left-section-all'>
                    <div className='quest-tasks-page-left-section-description'>
                        <div className='quest-tasks-page-left-section-description-pic'>
                            <Link className='quest-tasks-page-left-section-description-pic-link' to={''} rel="noopener noreferrer">
                                <img className="leftSectionLogoCompanyTasks" src={leftSectionLogoCompanyTasks} alt='leftSectionLogoCompanyTasks'/>
                            </Link>
                        </div>
                        <div className='quest-tasks-page-left-section-description-text'>
                            <div className='quest-tasks-page-left-section-description-text-title'>
                                <h2 className='quest-tasks-page-left-section-description-text-title-h2'>
                                    Welcome to the Celosphere
                                </h2>
                            </div>
                            <div className='quest-tasks-page-left-section-description-text-descript'>
                                <p className='quest-tasks-page-left-section-description-text-descript-p'>
                                    Celebrate the launch of Celosphere.xyz, a new NFT marketplace on Celo powered by RaribleX, with a free, limited-edition NFT mint.
                                </p>
                            </div>
                        </div>
                        <div className='quest-tasks-page-left-section-description-chain-level'>
                            <Link className='quest-tasks-page-left-section-description-chain-link' to={''} rel="noopener noreferrer">
                                <img className="pic-chain" src={leftSectionLogoCompanyTasks} alt='picChain'/>
                                <p className="text-chain">
                                    Avalanche
                                </p>
                            </Link>
                            <div className='quest-tasks-page-left-section-description-level-pic-text'>
                                <img className="pic-level" src={leftSectionLogoCompanyTasks} alt='picLevel'/>
                                <p className="text-level">
                                    Medium
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='quest-tasks-page-left-section-buttons'>
                        <QuestTasksButtons />
                    </div>
                </div>
            </section>
            <section className='quest-tasks-page-right-section'>
                <div className='quest-tasks-page-right-section-all'>
                    <div className='quest-tasks-page-right-section-task'>
                        <div className='quest-tasks-page-right-section-task-pic'>
                            <img className="task-pic" src={rightSectionLogoCompanyTasks} alt='taskPic'/>
                        </div>
                        <div className='quest-tasks-page-right-section-task-text'>
                            <div className='quest-tasks-page-right-section-task-text-title'>
                                <h2>
                                    Mint NFT
                                </h2>
                            </div>
                            <div className='quest-tasks-page-right-section-task-text-descript'>
                                <p>
                                    Mint the inaugural limited-edition NFT for the launch of the Celosphere, an NFT marketplace powered by RaribleX.
                                </p>
                            </div>
                        </div>
                        <div className='quest-tasks-page-right-section-task-button'>
                            <Link className='quest-tasks-page-right-section-task-button-link' to={''}>
                                <p>Open Uniswap</p>
                                <img className="pic-task-button" src={leftSectionLogoCompanyTasks} alt='picTaskButton'/>
                            </Link>
                        </div>
                        <div className='quest-tasks-page-right-section-task-button-verify'>
                            <button>
                                <p>Verify</p>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QuestTasksPage;
