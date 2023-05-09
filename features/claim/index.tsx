import dynamic from 'next/dynamic';

const ClaimForm = dynamic(import('features/claim/claimForm'), { ssr: false });

export default ClaimForm;
