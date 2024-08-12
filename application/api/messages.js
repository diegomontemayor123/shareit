import client from "./client";

const endpoint = "/messages";


const send =  (message, recipeId) => 
client.post(endpoint,{message,recipeId});
  

export default {
  send,
};
