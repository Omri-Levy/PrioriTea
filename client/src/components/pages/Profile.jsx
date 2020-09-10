import React, {useEffect, useState} from 'react';
import fetchFn from '../../static/js/requests/fetchFn.js';

const Profile = () => {
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentFullName, setCurrentFullName] = useState('');
    const getCurrentUserUrl = `${process.env.REACT_APP_API}/get_current_user`;

    useEffect(() => {
        const getCurrentUserOptions = {
            method: 'POST',
            credentials: 'include'
        };

        const fetchCurrentUser = async () => {
            const {data} = await fetchFn(getCurrentUserUrl,
                getCurrentUserOptions);

            setCurrentEmail(data.email);
            setCurrentFullName(data.fullName);
        }

        fetchCurrentUser().catch(err => console.error(err));

    }, []);


    return (
        <main className='body-container'>
            <div className='form-container'>
                <div className='form-label'>
                    Email: {currentEmail}
                </div>
                <div className='form-label'>
                    Full Name: {currentFullName}
                </div>
            </div>
        </main>
    );
};

export default Profile;
