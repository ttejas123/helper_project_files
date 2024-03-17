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

 async function getPropertyIds({accessToken, accountName}){
      try {
          const access_token = accessToken
          const url = `https://content-analyticsadmin.googleapis.com/v1beta/properties?filter=parent:${accountName}`
          const header = this.getHeaders({ accessToken: access_token });
          const response = await axios.get(url, {...header});
          return response.data
      } catch (err) {
          return null;
      }
  }

  async function getAccounts({accessToken}){
    try {
        const access_token = accessToken
        const url = "https://content-analyticsadmin.googleapis.com/v1beta/accounts"
        const header = getHeaders({ accessToken: access_token });
        const response = await axios.get(url, {...header});
        return response.data?.accounts
    } catch (err) {
        return null;
    }
  }

  async function createCustomDimension({propertyId, accessToken, customDimensionsArray=[]}) {
    const access_token = accessToken
    const api_callheaders = getHeaders({ accessToken: access_token })
    const url = `https://analyticsadmin.googleapis.com/v1beta/properties/${propertyId}/customDimensions`;
    const customDimensions = customDimensionsArray.map(row => ({
        displayName: row.displayName || '',
        parameterName: row.parameterName || '',
        scope: row.scope || '',
        description: row.description || '',
    }));
    const res = []
    for (const item of customDimensions) {
        const data = {
            description: item.description,
            displayName: item.displayName,
            scope: item.scope,
            parameterName: item.parameterName,
        };

        try {
            const response = await axios.post(url, data, api_callheaders);
            res.push(response.data)
        } catch (error) {
            res.push(error)
        }
    }

    return res;
  }

module.exports = {
    oAuth2Client,
    getHeaders,
    getAuthUri,
    getAccounts,
    getContainers,
    getAccessToken
}
