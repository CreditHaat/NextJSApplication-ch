/** @type {import('next').NextConfig} */
import { Google } from '@mui/icons-material';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
    images: {
        domains: [
            'credithaatimages.s3.ap-south-1.amazonaws.com',
            'chdocsusers.s3.ap-south-1.amazonaws.com'
            
        ],
    },
    webpack: (config) => {
        config.resolve.alias['@components'] = path.join(__dirname, 'components');
        return config;
    },

};

export default nextConfig;
