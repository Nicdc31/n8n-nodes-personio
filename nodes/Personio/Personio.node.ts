import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Personio implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		displayName: 'Personio',
		name: 'personio',
		icon: 'file:personio.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Utilizing the Personio HRIS Public API',
		defaults: {
			name: 'Personio API',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'PersonioApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.personio.de/',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			},
			{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			},
			// Operations will go here
		]
	};
}
