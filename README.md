# T.E.A.C.H.

## File Transfer

- transfer `Chat/Chat.tsx` to server
```
scp /Users/iris/Documents/MONDEGO_Lab/AI_Tutoring/ai_tutor_research/chatbot-ui/pages/api/chat.ts irisma@clotho.ics.uci.edu:/home/irisma/ai_tutor_research/chatbot-uipages/api/chat.ts
```

- transfer `Chat/Chat.tsx` to server
```
scp /Users/iris/Documents/MONDEGO_Lab/AI_Tutoring/ai_tutor_research/chatbot-ui/pages/api/google.ts irisma@clotho.ics.uci.edu:/home/irisma/ai_tutor_research/chatbot-ui/pages/api/google.ts
```

- transfer `Chat/Chat.tsx` to server
```
scp /Users/iris/Documents/MONDEGO_Lab/AI_Tutoring/ai_tutor_research/chatbot-ui/types/chat.ts irisma@clotho.ics.uci.edu:/home/irisma/ai_tutor_research/chatbot-ui/types/chat.ts
```

- transfer `Chat/Chat.tsx` to server
```
scp /Users/iris/Documents/MONDEGO_Lab/AI_Tutoring/ai_tutor_research/chatbot-ui/utils/server/index.ts irisma@clotho.ics.uci.edu:/home/irisma/ai_tutor_research/chatbot-ui/utils/server/index.ts
```

- transfer `Chat/Chat.tsx` to server
```
scp /Users/iris/Documents/MONDEGO_Lab/AI_Tutoring/ai_tutor_research/chatbot-ui/utils/app/clean.ts irisma@clotho.ics.uci.edu:/home/irisma/ai_tutor_research/chatbot-ui/utils/app/clean.ts
```

- transfer `Chat/Chat.tsx` to server
```sh
scp /Users/iris/Documents/MONDEGO_Lab/AI_Tutoring/ai_tutor_research/chatbot-ui/components/Chat/Chat.tsx irisma@clotho.ics.uci.edu:/home/irisma/ai_tutor_research/chatbot-ui/components/Chat/Chat.tsx
```

- transfer `Chat/ChatInput.tsx` to server
```sh
scp /Users/iris/Documents/MONDEGO_Lab/AI_Tutoring/ai_tutor_research/chatbot-ui/components/Chat/ChatInput.tsx irisma@clotho.ics.uci.edu:/home/irisma/ai_tutor_research/chatbot-ui/components/Chat/ChatInput.tsx
```

- transfer `pages/api/home/home.tsx` to server
```sh
scp /Users/iris/Documents/MONDEGO_Lab/AI_Tutoring/ai_tutor_research/chatbot-ui/pages/api/home/home.tsx irisma@clotho.ics.uci.edu:/home/irisma/ai_tutor_research/chatbot-ui/pages/api/home/home.tsx
```

- transfer `pages/_document.tsx` to server
```sh
scp /Users/iris/Documents/MONDEGO_Lab/AI_Tutoring/ai_tutor_research/chatbot-ui/pages/_document.tsx irisma@clotho.ics.uci.edu:/home/irisma/ai_tutor_research/chatbot-ui/pages/_document.tsx
```

## News

T.E.A.C.H. 2.0 is out as an updated, hosted product!

Check out [Takeoff Chat](https://www.takeoffchat.com/).

Open source version coming soon!

## About

T.E.A.C.H. is an open source chat UI for AI models.

See a [demo](https://twitter.com/mckaywrigley/status/1640380021423603713?s=46&t=AowqkodyK6B4JccSOxSPew).

![T.E.A.C.H.](./public/screenshots/screenshot-0402023.jpg)

## Updates

T.E.A.C.H. will be updated over time.

Expect frequent improvements.

**Next up:**

- [ ] Sharing
- [ ] "Bots"

## Deploy

**Vercel**

Host your own live version of T.E.A.C.H. with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmckaywrigley%2Fchatbot-ui)

**Docker**

Build locally:

```shell
docker build -t chatgpt-ui .
docker run -e OPENAI_API_KEY=xxxxxxxx -p 3000:3000 chatgpt-ui
```

Pull from ghcr:

```
docker run -e OPENAI_API_KEY=xxxxxxxx -p 3000:3000 ghcr.io/mckaywrigley/chatbot-ui:main
```

## Running Locally

**1. Clone Repo**

```bash
git clone https://github.com/irisma00/ai_tutor_frontend.git
```

**2. Install Dependencies**

```bash
npm i
```

**3. Provide OpenAI API Key**

Create a .env.local file in the root of the repo with your OpenAI API Key: (This step is unnecessary, because we call openai API from backend, but you can set the key to make sure the frontend is running)

```bash
OPENAI_API_KEY=YOUR_KEY
```

> You can set `OPENAI_API_HOST` where access to the official OpenAI host is restricted or unavailable, allowing users to configure an alternative host for their specific needs.

> Additionally, if you have multiple OpenAI Organizations, you can set `OPENAI_ORGANIZATION` to specify one.

**4. Run App**
* run locally
    ```bash
    npm run dev
    ```

* use this command for server running
    ```bash
    npm run dev -- -p 3333
    ```


**5. Use It**

You should be able to start chatting.

## Configuration

When deploying the application, the following environment variables can be set:

| Environment Variable              | Default value                  | Description                                                                                                                               |
| --------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| OPENAI_API_KEY                    |                                | The default API key used for authentication with OpenAI                                                                                   |
| OPENAI_API_HOST                   | `https://api.openai.com`       | The base url, for Azure use `https://<endpoint>.openai.azure.com`                                                                         |
| OPENAI_API_TYPE                   | `openai`                       | The API type, options are `openai` or `azure`                                                                                             |
| OPENAI_API_VERSION                | `2023-03-15-preview`           | Only applicable for Azure OpenAI                                                                                                          |
| AZURE_DEPLOYMENT_ID               |                                | Needed when Azure OpenAI, Ref [Azure OpenAI API](https://learn.microsoft.com/zh-cn/azure/cognitive-services/openai/reference#completions) |
| OPENAI_ORGANIZATION               |                                | Your OpenAI organization ID                                                                                                               |
| DEFAULT_MODEL                     | `gpt-3.5-turbo`                | The default model to use on new conversations, for Azure use `gpt-35-turbo`                                                               |
| NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT | [see here](utils/app/const.ts) | The default system prompt to use on new conversations                                                                                     |
| NEXT_PUBLIC_DEFAULT_TEMPERATURE   | 1                              | The default temperature to use on new conversations                                                                                       |
| GOOGLE_API_KEY                    |                                | See [Custom Search JSON API documentation][GCSE]                                                                                          |
| GOOGLE_CSE_ID                     |                                | See [Custom Search JSON API documentation][GCSE]                                                                                          |

If you do not provide an OpenAI API key with `OPENAI_API_KEY`, users will have to provide their own key.

If you don't have an OpenAI API key, you can get one [here](https://platform.openai.com/account/api-keys).

## Contact

If you have any questions, feel free to reach out to Mckay on [Twitter](https://twitter.com/mckaywrigley).

[GCSE]: https://developers.google.com/custom-search/v1/overview
