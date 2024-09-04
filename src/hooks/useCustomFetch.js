import { useDispatch, useSelector } from 'react-redux';
import { clearTokens, setTokens } from '../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';

const useCustomFetch = () => {

    const { accessToken, refreshToken } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    // console.log(accessToken)
    const navigate = useNavigate();
    const customFetch = async (url, options = {}) => {
        let response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.status === 401) {
            try {
                console.log('Access token expired, attempting to refresh token...');
                const refreshResponse = await fetch(`${import.meta.env.VITE_API_GLOBAL_URL}/admin/auth/refresh-token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: refreshToken }),
                });

                if (refreshResponse.ok) {
                    const { accessToken: newAccessToken } = await refreshResponse.json();
                    dispatch(setTokens({ accessToken: newAccessToken }));
                    sessionStorage.setItem('accessToken', newAccessToken);

                    // Retry the original request with the new access token
                    response = await fetch(url, {
                        ...options,
                        headers: {
                            ...options.headers,
                            'Authorization': `Bearer ${newAccessToken}`,
                        },
                    });
                    console.log('Token refreshed successfully');
                } else {
                    console.error('Failed to refresh token. Logging out...');
                    dispatch(clearTokens());
                    localStorage.removeItem('refreshToken');
                    sessionStorage.removeItem('refreshToken');
                    navigate('/');
                    throw new Error('Session expired');
                }
            } catch (error) {
                console.error('Error during token refresh', error);
                dispatch(clearTokens());
                localStorage.removeItem('refreshToken');
                sessionStorage.removeItem('refreshToken');
                navigate('/');
                throw new Error('Session expired');
            }
        }

        return response;
    };

    return customFetch;
};

export default useCustomFetch