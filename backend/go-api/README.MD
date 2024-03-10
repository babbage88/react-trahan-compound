# Sample Go API for Compound Interest
This is not complete until merged to master.

This is a basic example of a Golang based WebAPI which can be used for the backend of the Trahan Compound frontend. I have installed swagger which can be used to document/troubleshoot the WebAPI during development. 

## Setup for Swagger
I followed many...many different guides to get setup swagger setup properly with  golang's net/http. I'm used to .NET 6+ , where swagger is automatically configured for you when you create the WebAPI project, so I may have still missed some things or configured it here in a non-ideal way. But, it seems to be working correctly. I prefer to avoid third party depsendencies when possible and a lot of the guides I found were centered aroun Gin. They also mostly covered the Go swag utility, which parses you comments and generates the swagger.json and yaml files. While this is an important component, I wanted the UI available for local developement. Just about every guide that I can remember, left out the fact that you need to manually copy ./dist directory from the swagger-ui github repo to get the swagger-ui that gets serverd. These were the two guides I found that helped the most:

https://linggar.asia/?p=594
 https://medium.com/julotech/implementing-swagger-in-go-projects-8579a5fb955
I'm using the Ubuntu on WSL version 2 and had to run this command set PATH correctly before the `swag init` command would work: 

`export PATH=$(go env GOPATH)/bin:$PATH`