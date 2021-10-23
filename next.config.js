module.exports = {
    async redirects() {
        return [
            {
                source: '/auth',
                destination: '/auth/login',
                permanent: true,
            },
        ]
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/h',
    //             destination: '/home/classes'
    //         },
    //         {
    //             source: '/c/:id',
    //             destination: '/classes/:id'
    //         },
    //     ]
    // }
}