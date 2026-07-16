import {Configuration} from 'openai';
export const configureOpenAI=()=>{
    const config = new Configuration({
        apiKey:process.env.OPEN_AI_KEY,
        organization:process.env.OPENAI_ORGANIZATION_ID
    })
}