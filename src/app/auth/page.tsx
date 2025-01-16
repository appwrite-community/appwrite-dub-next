import { getLoggedInUser } from '@/lib/server/appwrite';
import { ID } from 'node-appwrite';
import { createAdminClient } from '@/lib/server/appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { addDubLead } from '@/lib/server/dub';

async function signUpWithEmail(formData: any) {
	'use server';

	const email = formData.get('email');
	const password = formData.get('password');
	const name = formData.get('name');

	const { account } = await createAdminClient();

	const user = await account.create(ID.unique(), email, password, name);
	const session = await account.createEmailPasswordSession(email, password);

	(await cookies()).set('my-custom-session', session.secret, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: true
	});

	const dub_id = (await cookies()).get('dub_id')?.value;
	if (dub_id) {
		addDubLead(user, dub_id);
		(await cookies()).delete('dub_id');
	}

	redirect('/account');
}

export default async function SignUpPage() {
	const user = await getLoggedInUser();
	if (user) redirect('/account');

	return (
		<>
			<form action={signUpWithEmail}>
				<input id="email" name="email" placeholder="Email" type="email" required />
				<input
					id="password"
					name="password"
					placeholder="Password"
					minLength={8}
					type="password"
					required
				/>
				<input id="name" name="name" placeholder="Name" type="text" required />
				<button type="submit">Sign up</button>
			</form>
		</>
	);
}
