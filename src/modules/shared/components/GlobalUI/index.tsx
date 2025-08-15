import ExpiredSession from '@components/ExpiredSession';
import LoadingProgress from '@components/LoadingProgress';
import Notification from '@components/Notification';

export default function GlobalUI() {
  return (
    <>
      <ExpiredSession />
      <LoadingProgress />
      <Notification />
    </>
  );
}
