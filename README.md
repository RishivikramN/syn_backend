# syn_backend

# API Documentation

## Authentication 
### End points
| User Auth |   URL |
|-----------|--------|
| Sign Up | {host}/api//registeruser|
| Sign In | {host}/api/signinuser|

### Access Level for Entities
| Entity | Access Level |
|--------|--------------|
| User | Everything |

### Request JSON Data For Auth
```
{
  "emailId": " ",
   "password":" ",
}
```

### Request JSON Data For GameDetails
```
{
  "emailId": " ",
  "score": {score},
  "date": {date}
}
```


## GET Endpoints

| Data |   URL |  Method|
|-----------|--------|--------|
| Game Details {score, today's date} | {host}/api/gamedetails | POST |
| High Score | {host}/api/highscore | GET|
| Game Count | {host}/api/gamecount | GET|
