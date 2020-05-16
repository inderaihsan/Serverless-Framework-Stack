import WhatsappBot from './server/controllers/WhatsAppBot';


const getBody = query => {
  const URLSearchParams = new URLSearchParams(query);
  const body = URLSearchParams.get('Body');
return body;
}; 

export const readgoogle = async (event, context) => {
  const body = getBody(event.body);

  const result = await WhatsappBot.googleSearch(body);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
    body: result,
  }; 
  
};