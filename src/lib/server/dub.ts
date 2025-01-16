import type { Models } from 'node-appwrite';
import { Dub } from 'dub';

const dub = new Dub({
	token: process.env.NEXT_DUB_API_KEY
});

export function addDubLead(user: Models.User<Models.Preferences>, dub_id: string) {
	dub.track.lead({
		clickId: dub_id,
		eventName: 'Sign Up',
		externalId: user.$id,
		customerName: user.name,
		customerEmail: user.email
	});
}
