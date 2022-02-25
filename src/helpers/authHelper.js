import { useRouter } from 'vue-router';

const router = useRouter();

export const authHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token) {
        return {
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`,
        };
    }

    router.push({ path: '' });

    return {};
};
