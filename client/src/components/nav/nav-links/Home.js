import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Lists from '../../lists/Lists.js';
import Pagination from '../../lists/Pagination';
import Loading from '../../loading/Loading.js';
import {displayCreateListModal} from '../../../static/js/handlers.js';

const Home = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [listsPerPage] = useState(1);

    const getLists = async () => {
        try {
            const res = (
                await axios
                    .get('http://localhost:3000/api/list/get_lists')
            );
            setLists(res.data);
            res.data.length === 0 && displayCreateListModal();
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const isLogged = JSON.parse(localStorage.getItem('isLogged'));
        if (!isLogged) {
            location.href = '/signin';
        }
    }, []);
    useEffect(() => {
        setLoading(true);
        getLists().catch(err => console.log(err));
        setLoading(false);

    }, []);
    useEffect(() => {
        const storedPage = parseInt(localStorage.getItem('currentPage'));
        if (storedPage) {
            setCurrentPage(storedPage);
        }
    }, []);
    useEffect(() => {
        const storePage = currentPage.toString();
        localStorage.setItem('currentPage', storePage)
    }, [currentPage]);
    const indexOfLastList = currentPage * listsPerPage;
    const indexOfFirstList = indexOfLastList - listsPerPage;
    const currentLists = lists.slice(indexOfFirstList, indexOfLastList);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    if (loading) {
        return (
            <Loading/>
        );
    } else {
        return (
            <div className='body-container'>
                <div className='lists-container'>
                    <Lists
                        lists={currentLists}
                        loading={loading}
                        getLists={getLists}
                    />
                    <Pagination
                        listsPerPage={listsPerPage}
                        totalLists={lists.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        );
    }
}

export default Home;
