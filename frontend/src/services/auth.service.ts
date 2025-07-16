import {IManager, IManagerLogin} from "@/models/IManager";
import {urlBuilder} from "@/urls/urls";
import {ITokenPair} from "@/models/IToken";

const authService = {
        authentication: async (authData: IManagerLogin): Promise<boolean> => {
                const response = await fetch(urlBuilder.loginUrl(), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(authData),
                });
                const data = await response.json();
                localStorage.setItem('manager', JSON.stringify(data.responseManager));
                localStorage.setItem('tokenPair', JSON.stringify(data.tokens));
                return !!(data?.tokens?.accessToken && data?.tokens?.refreshToken);
        },

        refresh: async () => {
                const tokenPair = JSON.parse(localStorage.getItem('tokenPair') || '{}') as ITokenPair;
                const refreshToken = tokenPair?.refreshToken;
                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }
                const response = await fetch(urlBuilder.refreshUrl(), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refreshToken }),
                });
                const data = await response.json();
                localStorage.setItem('tokenPair', JSON.stringify(data));
        },
        logout:async(): Promise<boolean> => {
                const tokenPair = JSON.parse(localStorage.getItem('tokenPair') || '{}');
                const accessToken = tokenPair?.accessToken;

                if (!accessToken) {
                    throw new Error("No access token available");
                }
                const response = await fetch(urlBuilder.logoutUrl(), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
            if (!response.ok) {
                throw new Error(`Logout failed: ${response.statusText}`);
            }
                localStorage.removeItem('manager');
                localStorage.removeItem('tokenPair');
                return true;
        },
    verify:async (token: string): Promise<boolean> => {
           const response = await fetch(urlBuilder.verifyUrl(), {
               method: 'POST',
            headers: {
                   'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })
        const data:IManager = await response.json();
        if (data) {
            localStorage.setItem("manager", JSON.stringify(data));
        }
        return true;
    }
};
export {
    authService
}