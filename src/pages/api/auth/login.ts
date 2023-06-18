import { convertStyleToAttrs } from '@iconify/tools';
import { NextRequest, NextResponse } from 'next/server'
import msal from 'src/@core/utils/msal'
import powerconfig from 'src/configs/powerconfig'

type UserDataType = {
    id: number
    role: string
    email: string
    fullName: string
    username: string
    password: string
    avatar?: string | null
  }


export default async function (req: NextRequest, res: NextResponse) {
const urls={
    login:'http://backend3:5003/api/User/GetLoginInfo',
    menu: 'http://backend3:5003/api/Menu/GetMenuList'
}

let token = '';
let menuItems={}
console.log('backend trying')
let user={
      username:encodeURIComponent(req.body.email),
      password:encodeURIComponent(req.body.password),
    }
try{
    token = await fetch(urls.login+`/${user.username}/${user.password}`).then(r=>{
        if(r.status == 200){
            return r.json()
        }else{
            throw new Error("No login")
        }
    })
}catch(e){
  return res.status(400).json({error:'error'})
}
  console.log("token", token);
  console.log("token", token.token);

try{ 
  menuItems = await fetch(urls.menu,
  {
    headers: {
		Authorization: `Bearer ${token.token}`, 
    },
  
  }).then(r=>r.json())

}catch(e){
  console.log('menuItems', e, urls)
}
console.log('pages', menuItems,  'we shoulg have pages here')
let newToken = {
  accessToken:token.token,
  userData:{...token.obj, id:token.obj.userId, role:token.obj.userRoleId==1?'admin':'client', password:undefined},
  menu:menuItems
                }
  res.json(newToken)

}