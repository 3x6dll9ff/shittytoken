class UserAPI {
    base_url = 'https://web-production-23fa.up.railway.app/';

    generatedOptions = (method, acceptOption, body, token) => {
        const acceptOptions = {
            json: 'application/json',
        }
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                accept: acceptOptions[acceptOption],
            }
        }
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
        if (body) {
            options.body = JSON.stringify(body);
        }
        return options;
    }

    buildRequest = (args, params) => {
        let url = this.base_url + args.join('/');
        if (params) {
            url += '?' + new URLSearchParams(params).toString();
        }
        return url;
    };

    getJsonResponse = async (
        method = 'GET',
        acceptOption = 'json',
        token = null,
        args,
        params = null,
        body = null
    ) => {
        try {
            const response = await fetch(
                this.buildRequest(args, params, body),
                this.generatedOptions(method, acceptOption, body, token)
            ).then(response => response.json());
            if (
                response.status === 400
                || response.status === 405
                || response.status === 422
            ) {
                return null;
            }
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    ping = async () => {
        return await this.getJsonResponse('GET', 'json', null, ['ping']);
    }

    getOnline = async () => {
        return await this.getJsonResponse('GET', 'json', null, ['users', 'get-online']);
    }

    generateNonce = async (address) => {
        return await this.getJsonResponse('POST', 'json', null, ['auth', 'web3', 'generate-nonce'], {address: address});
    }

    verifySignature = async (tempToken, signature) => {
        return await this.getJsonResponse('POST', 'json', null, ['auth', 'web3', 'verify-signature'], {
            temp_token: tempToken,
            signature: signature
        });
    }

    authIsValid = async (token) => {
        return await this.getJsonResponse('GET', 'json', token, ['auth', 'web3', 'is-valid']);
    }

    deactivateToken = async (token) => {
        return await this.getJsonResponse('DELETE', 'json', token, ['auth', 'web3', 'deactivate']);
    }

    getUser = async (token) => {
        return await this.getJsonResponse('GET', 'json', token, ['user']);
    }

    uploadUserAvatar = async (token, base64_image) => {
        return await this.getJsonResponse('POST', 'json', token, ['files', 'upload', 'avatar'], null, {base64_image: base64_image});
    }

    grabDocs = async (token) => {
        return await this.getJsonResponse('PATCH', 'json', token, ['docs', 'grab']);
    }

    checkDocsStatus = async (token) => {
        return await this.getJsonResponse('GET', 'json', token, ['docs', 'check-status']);
    }

    getQuests = async () => {
        return await this.getJsonResponse('GET', 'json', null, ['quests']);
    }

    getQuest = async (questId) => {
        return await this.getJsonResponse('GET', 'json', null, ['quest', questId]);
    }

    getChains = async () => {
        return await this.getJsonResponse('GET', 'json', null, ['chains']);
    }

    getChain = async (chainId) => {
        return await this.getJsonResponse('GET', 'json', null, ['chain', chainId]);
    }

    getProjects = async () => {
        return await this.getJsonResponse('GET', 'json', null, ['projects']);
    }

    getProject = async (projectId) => {
        return await this.getJsonResponse('GET', 'json', null, ['project', projectId]);
    }
}

const userAPI = new UserAPI();

export default userAPI;