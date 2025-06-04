import {authService} from "@/services/auth.service";

const myInterceptors = async (url: string, options: RequestInit, retry = true) => {
    try {
        const tokenPair = JSON.parse(localStorage.getItem('tokenPair') || '{}');
        const accessToken = tokenPair?.accessToken;
        if (accessToken) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${accessToken}`,
            };
        }
        const response = await fetch(url, options);
        if (response.status === 401 && retry) {
            await authService.refresh();
            return myInterceptors(url, options,false);
        }
        return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export {
    myInterceptors,
}
