import dynamic from 'next/dynamic';

const SnapshotForm = dynamic(import('features/snapshot/snapshotForm'), {
  ssr: false,
});

export default SnapshotForm;
