// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production:false,
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
  root: "http://localhost:4200",
  api_url: 'http://localhost:8080',
  base_url: 'http://localhost:8080',
  client_authorization_headers: {
    // 'Authorization': 'Basic ' + btoa('admin:admin@albino'),
    'Content-Type': 'application/json',
  },
  bearer_token_header:{
    'Authorization': 'Bearer ',
    'Content-Type': 'application/json'
  },

  current_user :{
    'currentUser' :  {}
  },

  bearer_token_header_file:{
    'Authorization': 'Bearer '
  },
  oauth_token: 'oauth_token',
  auth_token: "",
  httpPath: "http://"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
