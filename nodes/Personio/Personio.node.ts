import { INodeType, INodeTypeDescription } from 'n8n-workflow';
export class NasaPics implements INodeType {
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
			baseURL: 'https://api.nasa.gov',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Astronomy Picture of the Day',
						value: 'astronomyPictureOfTheDay',
					}
				],
				default: 'astronomyPictureOfTheDay',
			},
			// Operations will go here

		]
	};
}
