# Appwrite Dub.co Leads Example

Next.js SSR demo app that shows how to add Appwrite Auth sign ups as leads to Dub.co

## Environment variables

- `NEXT_PUBLIC_APPWRITE_ENDPOINT`: Endpoint of your Appwrite project
- `NEXT_PUBLIC_APPWRITE_PROJECT`: Project ID of your Appwrite project
- `NEXT_APPWRITE_KEY`: API key of your Appwrite project with `sessions.write` scope enabled
- `NEXT_DUB_API_KEY`: API key of your Dub.co workspace

## Steps to run

- Create a [Dub.co](https://dub.co/) workspace with the Business plan and an [Appwrite Cloud](https://cloud.appwrite.io) account
- Create a project and API key on Appwrite Cloud and add the endpoint, project ID, and API key to your `.env` file
- Create an API key on Dub.co and add to your `.env` file
- Enable conversion tracking for your links on Dub.co
- Run your project locally (using `npm run dev`) or deploy to production (don't forget to install dependencies using `npm install`)
- Create a link on Dub.co pointing to your app
- Click on the link, sign up in your app, and verify generated lead on Dub.co