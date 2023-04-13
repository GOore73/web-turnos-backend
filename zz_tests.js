import jwt from "./utils/jwt.js";

const a = jwt.decoded("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsInVzZXJfaWQiOiI2NDMzNDYxNjgzMWY4ODM4NmY2OTQ1OTEiLCJpYXQiOjE2ODEzMzkzNDY3NzYsImV4cCI6MTY4MzkzMTM0Njc3Nn0.RLMpP1yGJByZe3N1bHFdf4qWE6Mu1-nYN4PotSuri5w");

if (!a) {console.log("NOT A")} else {console.log(a.user_id)};