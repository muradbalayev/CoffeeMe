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
            // Token süresi dolmuş, refreshToken ile yenile
            const refreshResponse = await fetch('/auth/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: refreshToken }),
            });

            if (refreshResponse.ok) {
                const { newAccessToken, newRefreshToken } = await refreshResponse.json();
                dispatch(setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));

                // Yeniden dene
                response = await fetch(url, {
                    ...options,
                    headers: {
                        ...options.headers,
                        'Authorization': `Bearer ${newAccessToken}`,
                    },
                });
            } else {
                dispatch(clearTokens())
                localStorage.removeItem('refreshToken')
                navigate('/');
                throw new Error('Session expired');
            }
        }

        return response;
    };

    return customFetch;
};

export default useCustomFetch