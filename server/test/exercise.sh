#!/bin/bash

HOST='http://localhost:4343';
ProgramPath='/v1/program';
OPTS=' -v -H Content-Type: application/json ';

# POST
# curl -X POST -H "Content-Type: application/json" -d '{"uuid":"43431","name":"newnewnew43431"}' $HOST$ProgramPath

# PUT
# curl -v -X PUT -H "Content-Type: application/json" -d '{"type": "content", "name": "Program 0", "content": "<html>Hello, world!</html", "programmerId": "43"}' $HOST$ProgramPath

#GET
# curl $HOST$ProgramPath'?name=other'

# GET Beacon
# curl -v $HOST$ProgramPath'/5292847349bc20f70d000002'

# DELETE
# curl -X DELETE -H "Content-Type: application/json" -d '{"uuid":"43431"}' $HOST$ProgramPath

curl -X POST -H "Content-Type: application/json" -d '{"validity":false}' 'http://localhost:4017/dcms/v1/program/validate'
