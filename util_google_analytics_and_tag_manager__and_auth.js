const { google } = require('googleapis');
const axios = require('axios');
require('dotenv').config()
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET  
const redirectUrl = process.env.REDIRECT_URI
const scopes=["https://www.googleapis.com/auth/tagmanager.edit.containers", "https://www.googleapis.com/auth/tagmanager.readonly"] 

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);

function getHeaders({ accessToken }) {
    try {
        if(typeof accessToken !== 'string' || accessToken.length === 0) throw new Error("Invalid Access Token Provided");
        
        const headers = {
            Authorization: Bearer ${accessToken},
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        return { headers }
    } catch (err) {
        return null
    }
}

async function getAuthUri() {
  try {
      const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: scopes,
      });
      return authUrl
  } catch (error) {
      console.error('Error getting access token:', error);
      return null;
  }
}

async function getAccessToken(code) {
    const authorizationResponse = code;
    const { tokens } = await oAuth2Client.getToken(authorizationResponse);
    return tokens;
}

async function getAccounts({accessToken}) {
    try {
        const url = "https://www.googleapis.com/tagmanager/v2/accounts"
        const response = await axios.get(url, getHeaders({ accessToken }));
        return response.data
    } catch (err) {
        console.log("Error Fetching: ", err);
        return null;
    }
}

async function getContainers({accessToken, account_id}) {
    try {
        const url = https://www.googleapis.com/tagmanager/v2/accounts/${account_id}/containers
        const response = await axios.get(url, getHeaders({ accessToken }));
        return response.data
    } catch (err) {
        console.log("Error Fetching: ", err);
        return null;
    }
}

module.exports = {
    oAuth2Client,
    getHeaders,
    getAuthUri,
    getAccounts,
    getContainers,
    getAccessToken
}
