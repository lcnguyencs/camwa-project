// Success Response Helper
export const responseSuccess = (metaData = null, message = 'Success') => {
    return {
        status: 'success',
        code: 200,
        message: message,
        metaData: metaData,
        doc: 'https://api.example.com/docs'
    };
};

// Error Response Helper
export const responseError = (error, message = 'Internal Server Error') => {
    const statusCode = error.code || 500;
    return {
        status: 'error',
        code: statusCode,
        message: message,
        error: error.message || error,
        doc: 'https://api.example.com/docs'
    };
};
