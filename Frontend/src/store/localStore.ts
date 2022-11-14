const authTokenKey = "authToken";


class LocalStore {

    private authToken: string | null = null;
    private nftContractAddress: string | null = null;

    setAuthToken(value: string | null) {
        if (value && value.length > 0) {
            this.authToken = value;
            localStorage.setItem(authTokenKey, value);
        } else {
            this.authToken = null;
            localStorage.removeItem(authTokenKey);
        }
    }
    getAuthToken(): string | null {
        return this.authToken? this.authToken: this.authToken = localStorage.getItem(authTokenKey);
    }

}

export const localStore = new LocalStore();