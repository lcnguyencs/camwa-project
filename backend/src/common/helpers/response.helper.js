// Success Response Helper
export const responseSuccess = (metaData = null, message = 'Success', code = 200) => {
    return {
        status: 'success',
        code: code,
        message: message,
        metaData: metaData,
        doc: 'https://api.example.com/docs', // Updated to a more realistic documentation link
    };
};

// Error Response Helper
export const responseError = (message = 'Internal Server Error', code = 500, stack = null) => {
    return {
        status: 'error',
        code: code,
        message: message,
        stack: stack || 'No stack available', // Added a fallback for the stack trace
        doc: 'https://api.example.com/docs', // Added documentation link for error cases too
    };
};
