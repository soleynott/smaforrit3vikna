import 'dotenv/config';

export default {
    expo: {
    name: 'MyApp',
    slug: 'myapp',
    version: '1.0.0',
    extra: {
        KVM_USERNAME: process.env.KVM_USERNAME,
        KVM_PASSWORD: process.env.KVM_PASSWORD,
    },
    },
};
