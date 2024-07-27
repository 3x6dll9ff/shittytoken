import React from 'react';
import './css/quests.css'
import searchIcon from './assets/images/searchIcon.png'
import './assets/fonts/pixel_operator/PixelOperator.ttf'


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
            <div>
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
                            style={{  backgroundColor: 'black', fontFamily: 'Pixel Operator HB", sans-serif' }}
                        />
                    </div>
                </div>
                <div className='welcome-banner'>
                    <div className='welcome-banner-text'>
                        <h1>Welcome to the Quests page!</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Quests;