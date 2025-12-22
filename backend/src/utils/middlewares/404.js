// Therefore, middleWare is just a function
export const Error404 = (request, response, next) => {
    response.status(404).json({message : 'OOPS! You Typed Something Wrong...'});
}