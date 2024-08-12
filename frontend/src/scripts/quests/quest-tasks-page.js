import React from 'react'; // useEffect и useState можно временно удалить, если они больше не используются
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import '../../css/quests/quest-tasks-page.css';
import SwiperCore from 'swiper';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination]);

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

    return (
        <div className='quest-tasks-page'>
            <section className='quest-tasks-page-left-section'>
                <div className='quest-tasks-page-left-section-all'>
                    <div className='quest-tasks-page-left-section-description'>
                        <div className='quest-tasks-page-left-section-description-pic'>
                            <a>

                            </a>
                        </div>
                        <div className='quest-tasks-page-left-section-description-text'>
                            <div>

                            </div>
                            <div>

                            </div>
                        </div>
                        <div className='quest-tasks-page-left-section-description-chain-exp'>
                            <a>

                            </a>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default QuestTasksPage;
