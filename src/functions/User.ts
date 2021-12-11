import { APIGatewayProxyHandler } from "aws-lambda";
// import "source-map-support/register";

export const getUsers: APIGatewayProxyHandler = async (_event, _context ) => {
    return{
        statusCode: 200,
        body:JSON.stringify({msj:"Hola Tarola"})
    }
}
    