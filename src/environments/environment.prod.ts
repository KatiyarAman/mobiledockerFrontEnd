export const environment = {
  production: false,
  returnUrl: "",
  event: "",
  pageLimit: 10,
  sort: "",
  order: "desc",
  search: "",
  page: 1,
  startLimit: 1,
  startPage: 1,
  endPage: 5,
  root: "http://prod:4200",
  api_url: 'http://localhost:8080',
  base_url: 'http://localhost:8080',
  
  client_authorization_headers: {
     // 'Authorization': 'Basic ' + btoa('admin:admin@albino'),
     'Content-Type': 'application/json',
   },
   bearer_token_header:{
     'Authorization': 'Bearer ',
     'Content-Type': 'application/json',
     'moduleId': ""
   },
 
   current_user :{
     'currentUser' :  {}
   },
 
   bearer_token_header_file:{
     'Authorization': 'Bearer ',
     'moduleId': ""
   },
   oauth_token: 'oauth_token',
   auth_token: "",
   httpPath: "https://"
};
