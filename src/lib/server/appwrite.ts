// src/lib/server/appwrite.ts
'use server';
import { Client, Account } from 'node-appwrite';
import { cookies } from 'next/headers';

export async function createSessionClient() {
	const client = new Client()
		.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
		.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

	const session = (await cookies()).get('my-custom-session');
	if (!session || !session.value) {
		throw new Error('No session');
	}

	client.setSession(session.value);

	return {
		get account() {
			return new Account(client);
		}
	};
}

export async function createAdminClient() {
	const client = new Client()
		.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
		.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
		.setKey(process.env.NEXT_APPWRITE_KEY as string);

	return {
		get account() {
			return new Account(client);
		}
	};
}

export async function getLoggedInUser() {
	try {
		const { account } = await createSessionClient();
		return await account.get();
	} catch (error) {
		return null;
	}
}