import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    KVM_USERNAME: process.env.KVM_USERNAME,
    KVM_PASSWORD: process.env.KVM_PASSWORD,
  },
});
