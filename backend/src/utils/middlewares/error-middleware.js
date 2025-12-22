export const errorMiddleware = (err, request, response, next) => {
    console.error(err);
    const status = err.status || 500;
    response.status(status).json({message : err.message || 'OOPS! Something went wrong...'});
}