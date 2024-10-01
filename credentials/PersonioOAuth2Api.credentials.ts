import type {
	IAuthenticateGeneric,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestHelper,
	INodeProperties,
} from 'n8n-workflow';

export class PersonioOAuth2Api implements ICredentialType {
	name = 'personioOAuth2Api';

	displayName = 'Personio OAuth2 API';

	documentationUrl = 'https://developer.personio.de/';

	icon = { light: 'file:personio.svg', dark: 'file:personio.svg' } as const;

	httpRequestNode = {
		name: 'Personio',
		docsUrl: 'https://developer.personio.de/',
		apiBaseUrl: 'https://api.personio.de/v2/auth/token',
	};

	properties: INodeProperties[] = [
		{
			displayName: 'Session Token',
			name: 'sessionToken',
			type: 'hidden',

			typeOptions: {
				expirable: true,
			},
			default: '',
		},
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'client_credentials',
		},
		{
			displayName: 'URL',
			name: 'url',
			type: 'string',
			required: true,
			default: 'https://api.personio.de/',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			required: true,
			default: '',
		},
	];

	async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
		const url = credentials.url as string;
		const { access_token } = (await this.helpers.httpRequest({
			method: 'POST',
			url: `${url.endsWith('/') ? url.slice(0, -1) : url}/v2/auth/token`,
			body: {
				client_id: credentials.clientId,
				client_secret: credentials.clientSecret,
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})) as { access_token: string };
		return { sessionToken: access_token };
	}

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.sessionToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.url}}',
			url: 'v1/company/employees',
		},
	};
}
