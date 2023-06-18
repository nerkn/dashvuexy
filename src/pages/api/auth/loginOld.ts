import { convertStyleToAttrs } from '@iconify/tools';
import { NextRequest, NextResponse } from 'next/server'
import msal from 'src/@core/utils/msal'
import powerconfig from 'src/configs/powerconfig'

export default async function (req: NextRequest, res: NextResponse) {
let basicAuth = btoa(`dash:cokguzelsifrelisecret`);
console.log('request query/body params', req.query,  req.body)

let url = 'http://backend2:5000/connect/token';
let token = '';
let userInfo={}
let pages={}
console.log('backend trying')
let user1={
      username:'dash',
      password:'Dash1234!',}
let user2={
      username:'Sehirli',
      password:'Sehirli1234!',}
let user = user2; 
try{
token = await fetch(url, {
  method:'POST',
  headers:{
    'Content-Type':'application/x-www-form-urlencoded',
    Authorization: `Basic ${basicAuth}`, 
  },  
  redirect:'manual',
  body:new URLSearchParams({
      //client_id:'dash',
      //client_secret:'cokguzelsifrelisecret',
	  username:user.username,
	  password:user.password,
      grant_type:'password',
      scope:'n profile '
    }).toString()
  }).then(r=>{
    console.log('kendi fetchinimiz', r); console.log(r.headers); return r.json()
  })
}catch(e){
  console.log(e, url)
}
  console.log("token", token);
  console.log("token", token.access_token);
  console.log("token", typeof token);
try{

  userInfo = await fetch('http://backend2:5000/connect/userinfo',{
    headers: {Authorization: `Bearer ${token.access_token}`}}).then(r=>r.text())
	
}catch(e){
  console.log('userInfo', e, url)
}

try{
	let body = JSON.stringify({
      query: `query{
	  
  menu {
    displayText
    contentItemId
    menuItemsList {
      menuItems {
        ... on LinkMenuItem {
          displayText
          contentItemId
          linkMenuItem {
            url
            name
          }
        }
      }
    }
  }

	  }`
    })
console.log(body, `Bearer ${token.access_token}`)	
  pages = await fetch('http://backend2:5000/api/graphql',
  {
    method:'Post',
    headers: {
		Authorization: `Bearer ${token.access_token}`, 
		//Authorization: `Basic ${basicAuth}`, 
      'Content-Type':'application/json',
	  
    "accept": "application/json",
    },
    body:body,
    //`{"query":"query MyQuery {\n  pageDefinitions {\n    htmlBody {\n      html\n    }\n    displayText\n  }\n}\n","operationName":"MyQuery"}`    
	/*
	query MyQuery {
  menu {
    displayText
    contentItemId
    menuItemsList {
      menuItems {
        ... on LinkMenuItem {
          displayText
          contentItemId
          linkMenuItem {
            url
            name
          }
        }
      }
    }
  }
}

	*/
  
  }).then(r=>r.text())

}catch(e){
  console.log('menuItems', e, url)
}
console.log('userinfo', userInfo)
console.log('pages', pages,  'we shoulg have pages here')


  res.json(token)

}