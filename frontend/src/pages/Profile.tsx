import React from 'react';
import { useAuth } from '@/hooks/useAuth';

function Profile() {
    const { logoutMutation } = useAuth();

    return (
        <div className="flex flex-col w-full items-center h-full">
            <div className={`w-full h-full`}>
                <button onClick={() => logoutMutation.mutate(null)}>로그아웃</button>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
                <div>fdsfdsfdsafdsafdhskafhkdshflds</div>
            </div>
        </div>
    );
}

export default Profile;
