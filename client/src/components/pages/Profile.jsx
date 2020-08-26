import React, {useState} from 'react';
import getCurrentUserPost
    from '../../static/js/requests/getCurrentUserPost.js';

const Profile = () => {
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentFullName, setCurrentFullName] = useState('');

    getCurrentUserPost(setCurrentEmail, setCurrentFullName)
        .catch(err => console.error(err));

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
}

export default Profile;
