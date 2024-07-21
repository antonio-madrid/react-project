import {Link, NavLink} from "react-router-dom"
import {useSelector} from 'react-redux'

import '../styles/header.scss'
import {DebounceInput} from "react-debounce-input";
import {useState} from "react";

const Header = ({searchMovies}) => {

    const {starredMovies} = useSelector((state) => state.starred)

    const [inputValue, setInputValue] = useState(''); // Step 1

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        searchMovies(value);
    };

    const clearInput = () => {
        setInputValue('');
        searchMovies('');
    };

    return (
        <header>
            <Link to="/" data-testid="home" onClick={() => searchMovies('')}>
                <i className="bi bi-film"/>
            </Link>

            <nav>
                <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
                    {starredMovies.length > 0 ? (<>
                            <i className="bi bi-star-fill bi-star-fill-white"/>
                            <sup className="star-number">{starredMovies.length}</sup>
                        </>) : (<i className="bi bi-star"/>)}
                </NavLink>
                <NavLink to="/watch-later" className="nav-fav">
                    watch later
                </NavLink>
            </nav>

            <div className="input-group rounded">
                <div className="input-group rounded" style={{position: 'relative'}}>
                    <DebounceInput
                        onChange={handleInputChange}
                        value={inputValue}
                        className="form-control rounded"
                        placeholder="REACT INPUT"
                        aria-label="Search movies"
                        aria-describedby="search-addon"
                        debounceTimeout={500}
                    />
                    {inputValue && (
                        <a className="close" onClick={clearInput}>
                            &times;
                        </a>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
