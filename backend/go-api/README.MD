# Sample Go API for Compound Interest
This is not complete until merged to master.

This is a basic example of a Golang based WebAPI which can be used for the backend of the Trahan Compound frontend. I have installed swagger which can be used to document/troubleshoot the WebAPI during development. 

## Setup for Swagger
I followed this guid to setup swagger, https://medium.com/julotech/implementing-swagger-in-go-projects-8579a5fb955
I'm using the Ubuntu on WSL version 2 and had to run this command set PATH correctly before the `swag init` command would work: 

`export PATH=$(go env GOPATH)/bin:$PATH`