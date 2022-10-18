export type ProdIdType = { company: string; platform: string; language: string };

export type ICSPartialType = { partial: true };
export type ICSFullType = { partial: false };

export enum MethodType {
	PUBLISH = 'PUBLISH',
	REQUEST = 'REQUEST',
	REPLY = 'REPLY',
	ADD = 'ADD',
	CANCEL = 'CANCEL',
	REFRESH = 'REFRESH',
	COUNTER = 'COUNTER',
	DECLINECOUNTER = 'DECLINECOUNTER',
}

export type VersionType = '2.0';
