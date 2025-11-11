import React from "react";

export default {
    server: {
        proxy: {
            '/marvel': {
                target: 'https://marvel-server-zeta.vercel.app',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/marvel/, '')
            }
        }
    }
}